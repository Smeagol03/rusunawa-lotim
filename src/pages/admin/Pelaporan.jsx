import React, { useEffect, useState } from "react";
import { database } from "/src/config/firebase";
import { ref, onValue, update, remove } from "firebase/database";
import {
  CheckCircleIcon,
  TrashIcon,
  PhoneIcon,
  ClockIcon,
  ExclamationCircleIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import SearchInput from "/src/components/admin/SearchInput";
import {
  exportToExcel,
  LAPORAN_COLUMNS,
  prepareDataForExport,
} from "/src/config/exportExcel";

const Pelaporan = () => {
  const [laporanList, setLaporanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered list based on search
  const filteredList = laporanList.filter((laporan) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      laporan.nama?.toLowerCase().includes(query) ||
      laporan.nohp?.toLowerCase().includes(query) ||
      laporan.laporan?.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    const laporanRef = ref(database, "laporan");
    const unsubscribe = onValue(laporanRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        // Sort by newest first
        dataArray.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
        setLaporanList(dataArray);
      } else {
        setLaporanList([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      const laporanRef = ref(database, `laporan/${id}`);
      await update(laporanRef, { status: "read" });
    } catch (error) {
      alert("Gagal mengubah status laporan.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus laporan ini?")) return;
    try {
      const laporanRef = ref(database, `laporan/${id}`);
      await remove(laporanRef);
    } catch (error) {
      alert("Gagal menghapus laporan.");
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Hapus semua laporan dengan konfirmasi ganda
  const handleHapusSemua = async () => {
    if (laporanList.length === 0) {
      alert("Tidak ada laporan.");
      return;
    }
    if (
      !window.confirm(
        `Yakin ingin menghapus SEMUA ${laporanList.length} laporan?`
      )
    )
      return;

    if (
      !window.confirm(
        `KONFIRMASI KEDUA: ${laporanList.length} laporan akan dihapus secara permanen. Lanjutkan?`
      )
    )
      return;

    try {
      const deletePromises = laporanList.map((laporan) => {
        const laporanRef = ref(database, `laporan/${laporan.id}`);
        return remove(laporanRef);
      });
      await Promise.all(deletePromises);
      alert(`Berhasil menghapus ${laporanList.length} laporan.`);
    } catch (error) {
      alert("Gagal menghapus semua laporan: " + error.message);
    }
  };

  // Export ke Excel
  const handleExportExcel = async () => {
    const data = prepareDataForExport(laporanList, "laporan");
    await exportToExcel(
      data,
      LAPORAN_COLUMNS,
      "laporan_keluhan",
      "Laporan Keluhan"
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-linear-to-r from-indigo-50 to-purple-50">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <ExclamationCircleIcon className="w-6 h-6 text-indigo-600" />
              Laporan Keluhan
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {filteredList.length} dari {laporanList.length} laporan
            </p>
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 mt-2">
              {laporanList.length > 0 && (
                <button
                  onClick={handleHapusSemua}
                  className="flex items-center gap-1 text-xs bg-red-600 text-white px-3 py-1.5 rounded-full hover:bg-red-700 transition"
                >
                  <TrashIcon className="w-3 h-3" />
                  Hapus Semua
                </button>
              )}
              {laporanList.length > 0 && (
                <button
                  onClick={handleExportExcel}
                  className="flex items-center gap-1 text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-full hover:bg-emerald-700 transition"
                >
                  <ArrowDownTrayIcon className="w-3 h-3" />
                  Export Excel
                </button>
              )}
            </div>
          </div>
          {/* Search Input */}
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari nama, HP, atau isi laporan..."
          />
        </div>
      </div>

      {/* Content */}
      {filteredList.length === 0 ? (
        <div className="p-12 text-center text-gray-400">
          <ExclamationCircleIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>
            {searchQuery
              ? "Tidak ada hasil pencarian."
              : "Belum ada laporan masuk."}
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100 overflow-y-auto overflow-x-auto h-96">
          {filteredList.map((laporan) => (
            <div
              key={laporan.id}
              className={`p-5 hover:bg-gray-50 transition ${
                laporan.status === "unread" ? "bg-indigo-50/30" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                {/* Left: Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-800">
                      {laporan.nama}
                    </span>
                    {laporan.status === "unread" && (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-red-100 text-red-600 rounded-full uppercase">
                        Baru
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    <a
                      href={`https://wa.me/62${laporan.nohp?.replace(
                        /^0/,
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-emerald-600 hover:text-emerald-800 hover:underline"
                      title="Hubungi via WhatsApp"
                    >
                      <PhoneIcon className="w-3 h-3" />
                      {laporan.nohp}
                    </a>
                    <span className="flex items-center gap-1">
                      <ClockIcon className="w-3 h-3" />
                      {formatDate(laporan.tanggal)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-3 rounded-lg border border-gray-100">
                    {laporan.laporan}
                  </p>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-col gap-2 shrink-0">
                  {laporan.status === "unread" && (
                    <button
                      onClick={() => handleMarkAsRead(laporan.id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition"
                      title="Tandai sudah dibaca"
                    >
                      <CheckCircleIcon className="w-4 h-4" />
                      Selesai
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(laporan.id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-lg transition"
                    title="Hapus laporan"
                  >
                    <TrashIcon className="w-4 h-4" />
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pelaporan;
