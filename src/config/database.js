import { ref, set, onValue, update, remove } from "firebase/database";
import { database } from "./firebase";

/**
 * Menyimpan data pendaftar ke Realtime Database menggunakan NIK sebagai key
 * @param {Object} data - Data pendaftar dari form
 * @returns {Promise<void>}
 */
export const simpanPendaftar = (data) => {
  if (!data.nik) {
    return Promise.reject(new Error("NIK tidak ditemukan"));
  }

  // Reference path: pendaftar/<NIK>
  // Menggunakan NIK sebagai unique identifier agar mudah dicari dan tidak duplikat
  const pendaftarRef = ref(database, "pendaftar/" + data.nik);

  // Menambahkan timestamp server-side juga bisa dilakukan dengan serverTimestamp(),
  // tapi disini kita kirim manual atau biarkan data raw.
  // Kita tambahkan tanggal_daftar untuk sorting nanti.
  const dataToSave = {
    ...data,
    tanggal_daftar: new Date().toISOString(),
    status: "menunggu_verifikasi", // Default status
  };

  return set(pendaftarRef, dataToSave).catch((error) => {
    // Tangkap error jika permission denied (biasanya karena NIK sudah ada dan diblokir rules)
    if (
      error.code === "PERMISSION_DENIED" ||
      error.message.includes("permission_denied")
    ) {
      throw new Error(
        "NIK ini sudah terdaftar. Silakan hubungi admin jika ini kesalahan."
      );
    }
    throw error;
  });
};

/**
 * Mendengarkan perubahan data pendaftar secara realtime
 * @param {Function} callback - Function yang dipanggil saat ada data baru (menerima array of objects)
 * @returns {Function} Unsubscribe function
 */
export const listenToPendaftar = (callback) => {
  const pendaftarRef = ref(database, "pendaftar");

  return onValue(pendaftarRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      // Convert Object of Objects to Array of Objects
      const dataArray = Object.keys(data).map((key) => ({
        ...data[key],
      }));
      // Sort by newest (optional)
      dataArray.sort(
        (a, b) => new Date(b.tanggal_daftar) - new Date(a.tanggal_daftar)
      );
      callback(dataArray);
    } else {
      callback([]);
    }
  });
};

/**
 * Memindahkan data pendaftar ke tabel penghuni (Verifikasi)
 * @param {Object} dataPendaftar
 * @param {string} nomorUnit - Nomor unit (contoh: 01-1)
 * @returns {Promise<void>}
 */
export const verifikasiPendaftar = async (dataPendaftar, nomorUnit) => {
  if (!dataPendaftar.nik) throw new Error("ID tidak valid");
  if (!nomorUnit) throw new Error("Nomor Unit harus diisi");

  const updates = {};
  // 1. Tambah ke node penghuni dengan nomor unit
  updates[`/penghuni/${dataPendaftar.nik}`] = {
    ...dataPendaftar,
    status: "penghuni",
    nomor_unit: nomorUnit,
    tanggal_masuk: new Date().toISOString(),
  };

  // 2. Hapus dari pendaftar (sesuai request user agar tidak menumpuk)
  updates[`/pendaftar/${dataPendaftar.nik}`] = null;

  return update(ref(database), updates);
};

/**
 * Update unit penghuni (Pindah Kamar)
 * @param {string} nik
 * @param {string} newUnit
 */
/**
 * Update data lengkap penghuni (Edit Full)
 * @param {string} nik
 * @param {Object} newData
 */
export const updateDataPenghuni = async (nik, newData) => {
  if (!nik || !newData) throw new Error("Data tidak lengkap");
  const updates = {};
  updates[`/penghuni/${nik}`] = newData;
  return update(ref(database), updates);
};

/**
 * Update unit penghuni (Pindah Kamar - Helper)
 * @param {string} nik
 * @param {string} newUnit
 */
export const updateUnitPenghuni = async (nik, newUnit) => {
  if (!nik || !newUnit) throw new Error("Data tidak lengkap");
  const updates = {};
  updates[`/penghuni/${nik}/nomor_unit`] = newUnit;
  return update(ref(database), updates);
};

/**
 * Menghapus penghuni (Soft Delete ke Sampah & Kosongkan Unit)
 * @param {Object} dataPenghuni - Object penghuni lengkap (butuh NIK dan Nomor Unit untuk history)
 */
export const hapusPenghuni = async (dataPenghuni) => {
  if (!dataPenghuni.nik) throw new Error("NIK tidak valid");

  const updates = {};

  // 1. Pindah ke sampah_penghuni (Soft Delete)
  updates[`/sampah_penghuni/${dataPenghuni.nik}`] = {
    ...dataPenghuni,
    tanggal_dihapus: new Date().toISOString(),
    // Pastikan status berubah agar jelas ini adalah sampah
    status: "dihapus",
  };

  // 2. Hapus dari node penghuni (Otomatis unit jadi kosong karena referensinya hilang)
  updates[`/penghuni/${dataPenghuni.nik}`] = null;

  return update(ref(database), updates);
};

/**
 * Memindahkan data pendaftar ke tempat sampah (Soft Delete)
 * @param {Object} dataPendaftar
 * @returns {Promise<void>}
 */
export const pindahkanKeSampah = async (dataPendaftar) => {
  if (!dataPendaftar.nik) throw new Error("ID tidak valid");

  const updates = {};

  // 1. Simpan ke node sampah
  updates[`/sampah_pendaftar/${dataPendaftar.nik}`] = {
    ...dataPendaftar,
    tanggal_dihapus: new Date().toISOString(),
  };

  // 2. Hapus dari pendaftar
  updates[`/pendaftar/${dataPendaftar.nik}`] = null;

  return update(ref(database), updates);
};

// ... existing listener functions ...

/**
 * Mendengarkan perubahan data penghuni secara realtime
 * @param {Function} callback - Function yang dipanggil saat ada data baru
 * @returns {Function} Unsubscribe function
 */
export const listenToPenghuni = (callback) => {
  const penghuniRef = ref(database, "penghuni");

  return onValue(penghuniRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const dataArray = Object.keys(data).map((key) => ({
        ...data[key],
      }));
      // Sort by newest check-in
      dataArray.sort(
        (a, b) => new Date(b.tanggal_masuk) - new Date(a.tanggal_masuk)
      );
      callback(dataArray);
    } else {
      callback([]);
    }
  });
};

// ==========================================
// FITUR KERANJANG SAMPAH (TRASH BIN)
// ==========================================

export const listenToSampahPendaftar = (callback) => {
  const refDb = ref(database, "sampah_pendaftar");
  return onValue(refDb, (snapshot) => {
    const data = snapshot.val();
    callback(data ? Object.values(data) : []);
  });
};

export const listenToSampahPenghuni = (callback) => {
  const refDb = ref(database, "sampah_penghuni");
  return onValue(refDb, (snapshot) => {
    const data = snapshot.val();
    callback(data ? Object.values(data) : []);
  });
};

// Restore Pendaftar: Balik ke tabel pendaftar
export const pulihkanPendaftar = async (data) => {
  const updates = {};
  updates[`/pendaftar/${data.nik}`] = {
    ...data,
    status: "menunggu_verifikasi", // Reset status just in case
    tanggal_dihapus: null,
  };
  updates[`/sampah_pendaftar/${data.nik}`] = null;
  return update(ref(database), updates);
};

// Restore Penghuni: Balik ke tabel PENDAFTAR (bukan penghuni, karena unit mungkin sudah penuh)
// User harus verifikasi ulang untuk pilih unit baru
export const pulihkanPenghuni = async (data) => {
  const updates = {};
  updates[`/pendaftar/${data.nik}`] = {
    ...data,
    status: "menunggu_verifikasi", // Jadi pendaftar lagi
    nomor_unit: null, // Reset unit
    tanggal_masuk: null,
    tanggal_dihapus: null,
  };
  updates[`/sampah_penghuni/${data.nik}`] = null;
  return update(ref(database), updates);
};

export const hapusPermanenPendaftar = async (nik) => {
  return remove(ref(database, `sampah_pendaftar/${nik}`));
};

export const hapusPermanenPenghuni = async (nik) => {
  return remove(ref(database, `sampah_penghuni/${nik}`));
};
