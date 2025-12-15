import {
  ref,
  push,
  set,
  onValue,
  update,
  remove,
  query,
  orderByChild,
  limitToLast,
} from "firebase/database";
import { database } from "./firebase";

/**
 * Tipe-tipe notifikasi yang tersedia
 */
export const TIPE_NOTIFIKASI = {
  PENDAFTAR_BARU: "pendaftar_baru",
  VERIFIKASI: "verifikasi",
  PINDAH_UNIT: "pindah_unit",
  HAPUS_PENGHUNI: "hapus_penghuni",
  HAPUS_PENDAFTAR: "hapus_pendaftar",
  PULIHKAN: "pulihkan",
  HAPUS_PERMANEN: "hapus_permanen",
  LAPORAN_BARU: "laporan_baru",
};

/**
 * Icon dan warna untuk setiap tipe notifikasi
 */
export const NOTIFIKASI_CONFIG = {
  pendaftar_baru: {
    icon: "UserPlusIcon",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  verifikasi: {
    icon: "CheckCircleIcon",
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  pindah_unit: {
    icon: "ArrowsRightLeftIcon",
    color: "text-amber-600",
    bg: "bg-amber-100",
  },
  hapus_penghuni: {
    icon: "TrashIcon",
    color: "text-red-600",
    bg: "bg-red-100",
  },
  hapus_pendaftar: {
    icon: "TrashIcon",
    color: "text-red-600",
    bg: "bg-red-100",
  },
  pulihkan: {
    icon: "ArrowPathIcon",
    color: "text-green-600",
    bg: "bg-green-100",
  },
  hapus_permanen: {
    icon: "XCircleIcon",
    color: "text-gray-600",
    bg: "bg-gray-100",
  },
  laporan_baru: {
    icon: "ExclamationCircleIcon",
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
};

/**
 * Menyimpan log aktivitas ke database
 * @param {string} tipe - Tipe notifikasi (dari TIPE_NOTIFIKASI)
 * @param {string} pesan - Pesan notifikasi
 * @param {Object} data - Data tambahan (opsional)
 * @returns {Promise<void>}
 */
export const logAktivitas = async (tipe, pesan, data = {}) => {
  try {
    const notifikasiRef = ref(database, "notifikasi");
    const newRef = push(notifikasiRef);

    await set(newRef, {
      id: newRef.key,
      tipe,
      pesan,
      data,
      dibaca: false,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Gagal menyimpan log aktivitas:", error);
    // Tidak throw error agar tidak mengganggu operasi utama
  }
};

/**
 * Mendengarkan notifikasi secara realtime (semua)
 * @param {Function} callback
 * @returns {Function} Unsubscribe
 */
export const listenToNotifikasi = (callback) => {
  const notifikasiRef = ref(database, "notifikasi");
  const sortedQuery = query(notifikasiRef, orderByChild("timestamp"));

  return onValue(sortedQuery, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      // Convert to array and sort by newest
      const dataArray = Object.values(data).sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      callback(dataArray);
    } else {
      callback([]);
    }
  });
};

/**
 * Mendengarkan notifikasi terbaru (limit)
 * @param {Function} callback
 * @param {number} limit
 * @returns {Function} Unsubscribe
 */
export const listenToNotifikasiTerbaru = (callback, limit = 10) => {
  const notifikasiRef = ref(database, "notifikasi");
  const limitedQuery = query(
    notifikasiRef,
    orderByChild("timestamp"),
    limitToLast(limit)
  );

  return onValue(limitedQuery, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const dataArray = Object.values(data).sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      callback(dataArray);
    } else {
      callback([]);
    }
  });
};

/**
 * Menghitung jumlah notifikasi yang belum dibaca
 * @param {Function} callback
 * @returns {Function} Unsubscribe
 */
export const listenToUnreadCount = (callback) => {
  const notifikasiRef = ref(database, "notifikasi");

  return onValue(notifikasiRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const unreadCount = Object.values(data).filter((n) => !n.dibaca).length;
      callback(unreadCount);
    } else {
      callback(0);
    }
  });
};

/**
 * Tandai notifikasi sebagai sudah dibaca
 * @param {string} id
 */
export const tandaiDibaca = async (id) => {
  const updates = {};
  updates[`/notifikasi/${id}/dibaca`] = true;
  return update(ref(database), updates);
};

/**
 * Tandai semua notifikasi sebagai sudah dibaca
 */
export const tandaiSemuaDibaca = async () => {
  const notifikasiRef = ref(database, "notifikasi");

  return new Promise((resolve, reject) => {
    onValue(
      notifikasiRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const updates = {};
          Object.keys(data).forEach((key) => {
            updates[`/notifikasi/${key}/dibaca`] = true;
          });
          update(ref(database), updates).then(resolve).catch(reject);
        } else {
          resolve();
        }
      },
      { onlyOnce: true }
    );
  });
};

/**
 * Hapus notifikasi
 * @param {string} id
 */
export const hapusNotifikasi = async (id) => {
  return remove(ref(database, `notifikasi/${id}`));
};

/**
 * Hapus semua notifikasi
 */
export const hapusSemuaNotifikasi = async () => {
  return remove(ref(database, "notifikasi"));
};
