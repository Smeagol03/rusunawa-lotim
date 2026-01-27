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
  UsersIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
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

  const [selectedData, setSelectedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  const filteredPenghuni = useMemo(() => {
    if (!searchQuery.trim()) return penghuni;
    const query = searchQuery.toLowerCase();
    return penghuni.filter(
      (item) =>
        item.nama?.toLowerCase().includes(query) ||
        item.nik?.toLowerCase().includes(query) ||
        item.nomor_unit?.toLowerCase().includes(query),
    );
  }, [penghuni, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

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

  const openDetail = (data) => {
    setSelectedData(data);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEdit = (data) => {
    setSelectedData(data);
    setIsEditing(true);
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
      closeModal();
    } catch (error) {
      alert("Gagal menyimpan perubahan: " + error.message);
    }
  };

  const handleHapus = async (data) => {
    if (
      confirm(
        `Pindahkan ${data.nama} ke Sampah? Unit ${data.nomor_unit} akan dikosongkan.`,
      )
    ) {
      try {
        await hapusPenghuni(data);
      } catch (error) {
        alert("Gagal menghapus: " + error.message);
      }
    }
  };

  const handleHapusSemua = async () => {
    if (penghuni.length === 0) return;
    if (confirm(`Pindahkan SEMUA ${penghuni.length} penghuni ke sampah?`)) {
      try {
        await Promise.all(penghuni.map((p) => hapusPenghuni(p)));
      } catch (error) {
        alert("Gagal: " + error.message);
      }
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Database Penghuni
          </h1>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold ring-1 ring-blue-100">
              <UsersIcon className="w-3.5 h-3.5" />
              {penghuni.length} Penghuni Aktif
            </span>
            {searchQuery && (
              <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold ring-1 ring-amber-100">
                Found {filteredPenghuni.length} results
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={async () => {
              const data = prepareDataForExport(penghuni, "penghuni");
              await exportToExcel(
                data,
                PENGHUNI_COLUMNS,
                "penghuni",
                "Daftar Penghuni",
              );
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-200"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Export Database
          </button>

          <button
            onClick={handleHapusSemua}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-rose-600 border border-rose-100 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-rose-50 transition-all active:scale-95 shadow-sm"
          >
            <TrashIcon className="w-4 h-4" />
            Clear Database
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari berdasarkan nama, NIK, atau nomor unit..."
            className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-medium placeholder:text-slate-400 focus:outline-hidden focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all shadow-sm"
          />
        </div>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="px-6 py-4 bg-slate-100 text-slate-600 rounded-2xl text-sm font-bold hover:bg-slate-200 transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-900/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-50">
                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Penghuni
                </th>
                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  KTP (NIK)
                </th>
                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Lokasi Unit
                </th>
                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Status
                </th>
                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">
                  Management
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                        Loading database...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : paginatedPenghuni.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                        <UsersIcon className="w-10 h-10 text-slate-200" />
                      </div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                        No active residents found
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedPenghuni.map((item) => (
                  <tr
                    key={item.nik}
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-black text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                          {item.nama?.charAt(0)}
                        </div>
                        <span className="text-sm font-black text-slate-900">
                          {item.nama}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <code className="text-[11px] font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-md">
                        {item.nik}
                      </code>
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-black border border-blue-100">
                        {item.nomor_unit || "N/A"}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        Occupied
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openDetail(item)}
                          className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all active:scale-90"
                          title="View Profile"
                        >
                          <EyeIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => openEdit(item)}
                          className="p-2.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all active:scale-90"
                          title="Edit Personal Data"
                        >
                          <PencilSquareIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleHapus(item)}
                          className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all active:scale-90"
                          title="Evict/Move to Trash"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between px-8 py-6 bg-slate-50/30 border-t border-slate-50 gap-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Records {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredPenghuni.length)}{" "}
              of {filteredPenghuni.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 bg-white rounded-xl border border-slate-100 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xs"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                        : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 bg-white rounded-xl border border-slate-100 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xs"
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
        title="Profil Penghuni"
        isEditing={isEditing}
        onSave={handleSave}
        occupiedUnits={penghuni.map((p) => p.nomor_unit).filter(Boolean)}
      />
    </div>
  );
};

export default KelolaPenghuni;
