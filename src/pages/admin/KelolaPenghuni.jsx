import React, { useEffect, useState, useMemo } from "react";
import {
  listenToPenghuni,
  hapusPenghuni,
  updateDataPenghuni,
} from "/src/config/database";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import DetailModal from "/src/components/admin/DetailModal";
import SearchInput from "/src/components/admin/SearchInput";
import {
  exportToExcel,
  PENGHUNI_COLUMNS,
  prepareDataForExport,
} from "/src/config/exportExcel";

const KelolaPenghuni = () => {
  const [penghuni, setPenghuni] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [selectedData, setSelectedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Filtered data based on search query
  const filteredPenghuni = useMemo(() => {
    if (!searchQuery.trim()) return penghuni;

    const query = searchQuery.toLowerCase();
    return penghuni.filter(
      (item) =>
        item.nama?.toLowerCase().includes(query) ||
        item.nik?.toLowerCase().includes(query) ||
        item.nomor_unit?.toLowerCase().includes(query)
    );
  }, [penghuni, searchQuery]);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Paginated data
  const totalPages = Math.ceil(filteredPenghuni.length / ITEMS_PER_PAGE);
  const paginatedPenghuni = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPenghuni.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPenghuni, currentPage]);

  useEffect(() => {
    const unsubscribe = listenToPenghuni((data) => {
      setPenghuni(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Format date readable
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const openDetail = (data) => {
    setSelectedData(data);
    setIsEditing(false); // Default view mode
    setIsModalOpen(true);
  };

  const openEdit = (data) => {
    setSelectedData(data);
    setIsEditing(true); // Edit mode
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedData(null);
    setIsEditing(false);
  };

  const handleSave = async (newData) => {
    try {
      await updateDataPenghuni(newData.nik, newData);
      alert("Data berhasil diperbarui!");
      closeModal();
    } catch (error) {
      alert("Gagal menyimpan perubahan: " + error.message);
    }
  };

  const handleHapus = async (data) => {
    if (
      window.confirm(
        `Yakin ingin menghapus ${data.nama}? Data akan dipindah ke Keranjang Sampah dan Unit akan dikosongkan.`
      )
    ) {
      try {
        await hapusPenghuni(data);
        alert("Penghuni berhasil dihapus (Soft Delete).");
      } catch (error) {
        alert("Gagal menghapus: " + error.message);
      }
    }
  };

  // Delete all penghuni to trash
  const handleHapusSemua = async () => {
    if (penghuni.length === 0) {
      alert("Tidak ada data penghuni.");
      return;
    }
    if (
      !window.confirm(
        `Yakin ingin memindahkan SEMUA ${penghuni.length} penghuni ke Keranjang Sampah? Semua unit akan dikosongkan.`
      )
    )
      return;

    if (
      !window.confirm(
        `KONFIRMASI KEDUA: ${penghuni.length} penghuni akan dipindahkan ke sampah. Lanjutkan?`
      )
    )
      return;

    try {
      await Promise.all(penghuni.map((p) => hapusPenghuni(p)));
      alert(`Berhasil memindahkan ${penghuni.length} penghuni ke sampah.`);
    } catch (error) {
      alert("Gagal: " + error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Daftar Penghuni</h1>
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-1">
            <span className="bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full">
              Total: {penghuni.length}
            </span>
            {searchQuery && (
              <span className="bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full">
                Ditemukan: {filteredPenghuni.length}
              </span>
            )}
          </div>
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-2">
            {penghuni.length > 0 && (
              <button
                onClick={handleHapusSemua}
                className="flex items-center gap-1 text-xs bg-red-600 text-white px-3 py-1.5 rounded-full hover:bg-red-700 transition"
              >
                <TrashIcon className="w-3 h-3" />
                Hapus Semua
              </button>
            )}
            {penghuni.length > 0 && (
              <button
                onClick={async () => {
                  const data = prepareDataForExport(penghuni, "penghuni");
                  await exportToExcel(
                    data,
                    PENGHUNI_COLUMNS,
                    "penghuni",
                    "Daftar Penghuni"
                  );
                }}
                className="flex items-center gap-1 text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-full hover:bg-emerald-700 transition"
              >
                <ArrowDownTrayIcon className="w-3 h-3" />
                Export Excel
              </button>
            )}
          </div>
        </div>
        {/* Search Input */}
        <div className="w-full md:w-72">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari nama, NIK, atau Unit..."
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto max-h-96 overflow-y-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-800 font-semibold uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">Nama Lengkap</th>
                <th className="px-6 py-4">NIK</th>
                <th className="px-6 py-4">Unit</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    Memuat data penghuni...
                  </td>
                </tr>
              ) : filteredPenghuni.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    {searchQuery
                      ? "Tidak ada hasil yang cocok."
                      : "Belum ada data penghuni."}
                  </td>
                </tr>
              ) : (
                paginatedPenghuni.map((item) => (
                  <tr
                    key={item.nik}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {item.nama}
                    </td>
                    <td className="px-6 py-4">{item.nik}</td>
                    <td className="px-6 py-4 font-bold text-blue-600">
                      {item.nomor_unit || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-semibold">
                        Aktif
                      </span>
                    </td>
                    <td className="px-6 py-4 flex justify-center space-x-2">
                      {/* Lihat Detail */}
                      <button
                        onClick={() => openDetail(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Lihat Detail"
                      >
                        <EyeIcon className="w-5 h-5" />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => openEdit(item)}
                        className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Edit Data"
                      >
                        <PencilSquareIcon className="w-5 h-5" />
                      </button>

                      {/* Hapus */}
                      <button
                        onClick={() => handleHapus(item)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <div className="text-sm text-gray-600">
              Menampilkan {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredPenghuni.length)}{" "}
              dari {filteredPenghuni.length}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition ${
                  currentPage === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <span className="px-3 py-1 text-sm font-medium text-gray-700">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg transition ${
                  currentPage === totalPages
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      <DetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={selectedData}
        title="Detail Penghuni"
        isEditing={isEditing}
        onSave={handleSave}
        occupiedUnits={penghuni.map((p) => p.nomor_unit).filter(Boolean)} // Calculate and pass occupied units
      />
    </div>
  );
};

export default KelolaPenghuni;
