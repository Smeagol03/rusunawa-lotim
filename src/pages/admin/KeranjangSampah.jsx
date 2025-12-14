import React, { useEffect, useState, useMemo } from "react";
import {
  listenToSampahPendaftar,
  listenToSampahPenghuni,
  pulihkanPendaftar,
  pulihkanPenghuni,
  hapusPermanenPendaftar,
  hapusPermanenPenghuni,
} from "/src/config/database";
import {
  TrashIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import SearchInput from "/src/components/admin/SearchInput";
import KonfirmasiModal from "/src/components/admin/KonfirmasiModal";

const KeranjangSampah = () => {
  const [activeTab, setActiveTab] = useState("pendaftar"); // 'pendaftar' | 'penghuni'
  const [dataPendaftar, setDataPendaftar] = useState([]);
  const [dataPenghuni, setDataPenghuni] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State for layered confirmation
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const unsubPendaftar = listenToSampahPendaftar((data) => {
      setDataPendaftar(data);
      setLoading(false);
    });
    const unsubPenghuni = listenToSampahPenghuni((data) => {
      setDataPenghuni(data);
      setLoading(false);
    });

    return () => {
      unsubPendaftar();
      unsubPenghuni();
    };
  }, []);

  // Clear selection and search when tab changes
  useEffect(() => {
    setSelectedIds(new Set());
    setSearchQuery("");
  }, [activeTab]);

  const currentData = activeTab === "pendaftar" ? dataPendaftar : dataPenghuni;

  // Filtered data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return currentData;

    const query = searchQuery.toLowerCase();
    return currentData.filter(
      (item) =>
        item.nama?.toLowerCase().includes(query) ||
        item.nik?.toLowerCase().includes(query)
    );
  }, [currentData, searchQuery]);

  // Toggle Selection
  const toggleSelect = (id) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === currentData.length) {
      setSelectedIds(new Set());
    } else {
      const allIds = new Set(currentData.map((item) => item.nik));
      setSelectedIds(allIds);
    }
  };

  // Actions
  const handleRestore = async () => {
    if (selectedIds.size === 0) return;
    if (
      !window.confirm(
        `Pulihkan ${selectedIds.size} item terpilih? Data akan kembali ke daftar Pendaftar.`
      )
    )
      return;

    try {
      const promises = Array.from(selectedIds).map((id) => {
        const item = currentData.find((d) => d.nik === id);
        return activeTab === "pendaftar"
          ? pulihkanPendaftar(item)
          : pulihkanPenghuni(item);
      });
      await Promise.all(promises);
      alert("Berhasil memulihkan data!");
      setSelectedIds(new Set());
    } catch (e) {
      alert("Gagal memulihkan: " + e.message);
    }
  };

  // Open modal for delete confirmation
  const handleDeletePermanentClick = () => {
    if (selectedIds.size === 0) return;
    setIsDeleteModalOpen(true);
  };

  // Actual delete execution (called from modal)
  const executeDeletePermanent = async () => {
    try {
      const promises = Array.from(selectedIds).map((id) => {
        return activeTab === "pendaftar"
          ? hapusPermanenPendaftar(id)
          : hapusPermanenPenghuni(id);
      });
      await Promise.all(promises);
      alert("Data berhasil dihapus selamanya.");
      setSelectedIds(new Set());
    } catch (e) {
      alert("Gagal menghapus: " + e.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Keranjang Sampah
          </h1>
          <p className="text-sm text-slate-500">
            Kelola data yang telah dihapus sementara
          </p>
        </div>

        {/* Action Bar */}
        {selectedIds.size > 0 && (
          <div className="flex gap-2 animate-fadeIn bg-white p-2 rounded-lg shadow-sm border border-slate-200">
            <button
              onClick={handleRestore}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 font-medium transition"
            >
              <ArrowPathIcon className="w-4 h-4" />
              Pulihkan ({selectedIds.size})
            </button>
            <button
              onClick={handleDeletePermanentClick}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium transition"
            >
              <TrashIcon className="w-4 h-4" />
              Hapus Permanen ({selectedIds.size})
            </button>
          </div>
        )}
      </div>

      {/* Search Input */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="w-full md:w-72">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari nama atau NIK..."
          />
        </div>
        {searchQuery && (
          <span className="bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full">
            Ditemukan: {filteredData.length}
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("pendaftar")}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
            activeTab === "pendaftar"
              ? "border-emerald-500 text-emerald-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Pendaftar Dihapus ({dataPendaftar.length})
        </button>
        <button
          onClick={() => setActiveTab("penghuni")}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
            activeTab === "penghuni"
              ? "border-emerald-500 text-emerald-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Penghuni Dihapus ({dataPenghuni.length})
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-800 font-semibold uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4 w-10">
                  <input
                    type="checkbox"
                    checked={
                      filteredData.length > 0 &&
                      selectedIds.size === filteredData.length
                    }
                    onChange={toggleSelectAll}
                    disabled={filteredData.length === 0}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                </th>
                <th className="px-6 py-4">Nama Lengkap</th>
                <th className="px-6 py-4">NIK</th>
                <th className="px-6 py-4">Tanggal Dihapus</th>
                <th className="px-6 py-4">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    Memuat data...
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <TrashIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">
                      {searchQuery
                        ? "Tidak ada hasil yang cocok."
                        : "Keranjang sampah kosong."}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr
                    key={item.nik}
                    className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                      selectedIds.has(item.nik) ? "bg-emerald-50/50" : ""
                    }`}
                    onClick={(e) => {
                      // Prevent toggle if clicking proper checkbox handled by itself
                      if (e.target.type !== "checkbox") toggleSelect(item.nik);
                    }}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(item.nik)}
                        onChange={() => toggleSelect(item.nik)}
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {item.nama}
                    </td>
                    <td className="px-6 py-4">{item.nik}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {item.tanggal_dihapus
                        ? new Date(item.tanggal_dihapus).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "-"}
                    </td>
                    <td className="px-6 py-4 text-xs">
                      {activeTab === "penghuni" ? (
                        <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded">
                          Eks Penghuni
                        </span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                          Eks Pendaftar
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3 text-sm text-blue-800">
        <ExclamationTriangleIcon className="w-5 h-5 shrink-0" />
        <p>
          <strong>Catatan:</strong> Data Penghuni yang dipulihkan akan masuk
          kembali ke daftar
          <strong> Pendaftar (Menunggu Verifikasi)</strong>. Anda perlu
          memverifikasi ulang dan memilihkan unit baru untuk mereka.
        </p>
      </div>

      {/* Layered Confirmation Modal */}
      <KonfirmasiModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={executeDeletePermanent}
        title="Hapus Data Permanen"
        message="Data yang dihapus permanen tidak dapat dikembalikan lagi!"
        confirmWord="KONFIRMASI"
        itemCount={selectedIds.size}
      />
    </div>
  );
};

export default KeranjangSampah;
