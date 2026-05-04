import { ref, set, push, onValue, update, remove, query, orderByChild } from "firebase/database";
import { database } from "./firebase";
import { logAktivitas, TIPE_NOTIFIKASI } from "./notifikasi";

// --- HELPERS ---
const mapSnapshotToArray = (snapshot) => {
  const data = snapshot.val();
  if (!data) return [];
  return Object.values(data);
};

// --- PENDAFTAR ---

export const simpanPendaftar = async (data) => {
  if (!data.nik) throw new Error("NIK tidak ditemukan");
  
  const pendaftarRef = ref(database, "pendaftar");
  const newPendaftarRef = push(pendaftarRef);

  const dataToSave = {
    ...data,
    id: newPendaftarRef.key,
    tanggal_daftar: new Date().toISOString(),
    status: "menunggu_verifikasi",
  };

  try {
    await set(newPendaftarRef, dataToSave);
    await logAktivitas(
      TIPE_NOTIFIKASI.PENDAFTAR_BARU,
      `${data.nama} mendaftar sebagai calon penghuni`,
      { nama: data.nama, nik: data.nik }
    );
  } catch (error) {
    if (error.code === "PERMISSION_DENIED") throw new Error("Akses ditolak. NIK harus 16 digit.");
    throw error;
  }
};

export const listenToPendaftar = (callback) => {
  const pendaftarRef = ref(database, "pendaftar");
  return onValue(pendaftarRef, (snapshot) => {
    const dataArray = mapSnapshotToArray(snapshot).sort(
      (a, b) => new Date(b.tanggal_daftar) - new Date(a.tanggal_daftar)
    );
    callback(dataArray);
  });
};

export const pindahkanKeSampah = async (dataPendaftar) => {
  const id = dataPendaftar.id;
  if (!id) throw new Error("ID tidak valid");

  const updates = {};
  updates[`/sampah_pendaftar/${id}`] = {
    ...dataPendaftar,
    tanggal_dihapus: new Date().toISOString(),
  };
  updates[`/pendaftar/${id}`] = null;

  await update(ref(database), updates);
  await logAktivitas(
    TIPE_NOTIFIKASI.HAPUS_PENDAFTAR,
    `Pendaftar ${dataPendaftar.nama} dibuang ke sampah`,
    { nama: dataPendaftar.nama, id }
  );
};

// --- PENGHUNI ---

export const verifikasiPendaftar = async (dataPendaftar, nomorUnit) => {
  const id = dataPendaftar.id;
  if (!id || !nomorUnit) throw new Error("Data tidak lengkap");

  const updates = {};
  updates[`/penghuni/${id}`] = {
    ...dataPendaftar,
    status: "penghuni",
    nomor_unit: nomorUnit,
    tanggal_masuk: new Date().toISOString(),
  };
  updates[`/pendaftar/${id}`] = null;

  await update(ref(database), updates);
  await logAktivitas(
    TIPE_NOTIFIKASI.VERIFIKASI,
    `${dataPendaftar.nama} diverifikasi ke Unit ${nomorUnit}`,
    { nama: dataPendaftar.nama, id, unit: nomorUnit }
  );
};

export const listenToPenghuni = (callback) => {
  const penghuniRef = ref(database, "penghuni");
  return onValue(penghuniRef, (snapshot) => {
    const dataArray = mapSnapshotToArray(snapshot).sort(
      (a, b) => new Date(b.tanggal_masuk) - new Date(a.tanggal_masuk)
    );
    callback(dataArray);
  });
};

export const updateUnitPenghuni = async (id, newUnit, nama = "Penghuni") => {
  const updates = {};
  updates[`/penghuni/${id}/nomor_unit`] = newUnit;
  await update(ref(database), updates);
  await logAktivitas(TIPE_NOTIFIKASI.PINDAH_UNIT, `${nama} pindah ke ${newUnit}`, { id, unit: newUnit });
};

export const updateDataPenghuni = async (id, newData) => {
  if (!id || !newData) throw new Error("Data tidak lengkap");
  const updates = {};
  updates[`/penghuni/${id}`] = newData;
  return update(ref(database), updates);
};

export const hapusPenghuni = async (dataPenghuni) => {
  const id = dataPenghuni.id;
  const updates = {};
  updates[`/sampah_penghuni/${id}`] = { ...dataPenghuni, tanggal_dihapus: new Date().toISOString(), status: "dihapus" };
  updates[`/penghuni/${id}`] = null;
  await update(ref(database), updates);
  await logAktivitas(TIPE_NOTIFIKASI.HAPUS_PENGHUNI, `${dataPenghuni.nama} dibuang ke sampah`, { id });
};

// --- TRASH BIN ---

export const listenToSampahPendaftar = (callback) => {
  return onValue(ref(database, "sampah_pendaftar"), (s) => callback(mapSnapshotToArray(s)));
};

export const listenToSampahPenghuni = (callback) => {
  return onValue(ref(database, "sampah_penghuni"), (s) => callback(mapSnapshotToArray(s)));
};

export const pulihkanPendaftar = async (data) => {
  const updates = { [`/pendaftar/${data.id}`]: { ...data, status: "menunggu_verifikasi", tanggal_dihapus: null }, [`/sampah_pendaftar/${data.id}`]: null };
  await update(ref(database), updates);
};

export const pulihkanPenghuni = async (data) => {
  const updates = { [`/pendaftar/${data.id}`]: { ...data, status: "menunggu_verifikasi", nomor_unit: null, tanggal_masuk: null, tanggal_dihapus: null }, [`/sampah_penghuni/${data.id}`]: null };
  await update(ref(database), updates);
};

export const hapusPermanenPendaftar = (id) => remove(ref(database, `sampah_pendaftar/${id}`));
export const hapusPermanenPenghuni = (id) => remove(ref(database, `sampah_penghuni/${id}`));
