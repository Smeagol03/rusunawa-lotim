import React, { useEffect, useState, useMemo } from "react";
import {
  listenToPendaftar,
  listenToPenghuni,
  verifikasiPendaftar,
  pindahkanKeSampah,
} from "/src/config/database";
import {
  EyeIcon,
  CheckCircleIcon,
  TrashIcon,
  PlusCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowDownTrayIcon,
  UserPlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import DetailModal from "/src/components/admin/DetailModal";
import PilihUnitModal from "/src/components/admin/PilihUnitModal";
import SearchInput from "/src/components/admin/SearchInput";
import { seedDummyPendaftar } from "/src/config/seeder";
import {
  exportToExcel,
  PENDAFTAR_COLUMNS,
  prepareDataForExport,
} from "/src/config/exportExcel";

const KelolaPendaftar = () => {
  const [pendaftar, setPendaftar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  const [occupiedUnits, setOccupiedUnits] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);
  const [pendaftarToVerify, setPendaftarToVerify] = useState(null);

  const filteredPendaftar = useMemo(() => {
    if (!searchQuery.trim()) return pendaftar;
    const query = searchQuery.toLowerCase();
    return pendaftar.filter(
      (item) =>
        item.nama?.toLowerCase().includes(query) ||
        item.nik?.toLowerCase().includes(query) ||
        item.no_hp?.toLowerCase().includes(query),
    );
  }, [pendaftar, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredPendaftar.length / ITEMS_PER_PAGE);
  const paginatedPendaftar = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPendaftar.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPendaftar, currentPage]);

  useEffect(() => {
    const unsubscribePendaftar = listenToPendaftar((data) => {
      setPendaftar(data);
      setLoading(false);
    });

    const unsubscribePenghuni = listenToPenghuni((data) => {
      const occupied = data.map((p) => p.nomor_unit).filter(Boolean);
      setOccupiedUnits(occupied);
    });

    return () => {
      unsubscribePendaftar();
      unsubscribePenghuni();
    };
  }, []);

  const handleSeedData = async () => {
    setSeeding(true);
    try {
      await seedDummyPendaftar(5);
    } catch (e) {
      console.error(e);
    } finally {
      setSeeding(false);
    }
  };

  const handleVerifikasiClick = (data) => {
    setPendaftarToVerify(data);
    setIsUnitModalOpen(true);
  };

  const handleUnitSelected = async (unitId) => {
    if (!pendaftarToVerify) return;
    try {
      await verifikasiPendaftar(pendaftarToVerify, unitId);
      setIsUnitModalOpen(false);
      setPendaftarToVerify(null);
      closeModal();
    } catch (error) {
      alert("Gagal memverifikasi: " + error.message);
    }
  };

  const handleHapus = async (data) => {
    if (confirm(`Pindahkan ${data.nama} ke Sampah?`)) {
      try {
        await pindahkanKeSampah(data);
      } catch (error) {
        alert("Gagal menghapus: " + error.message);
      }
    }
  };

  const handleHapusSemua = async () => {
    if (pendaftar.length === 0) return;
    if (confirm(`Pindahkan SEMUA ${pendaftar.length} data ke sampah?`)) {
      try {
        await Promise.all(pendaftar.map((p) => pindahkanKeSampah(p)));
      } catch (error) {
        alert("Gagal: " + error.message);
      }
    }
  };

  const openDetail = (data) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedData(null);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Antrean Pendaftar
          </h1>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold ring-1 ring-emerald-100">
              <UserPlusIcon className="w-3.5 h-3.5" />
              {pendaftar.length} Total Berkas
            </span>
            {searchQuery && (
              <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold ring-1 ring-amber-100">
                Found {filteredPendaftar.length} results
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-4 lg:mt-0">
          <button
            onClick={handleSeedData}
            disabled={seeding}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all disabled:opacity-50 active:scale-95 shadow-lg shadow-slate-200"
          >
            <PlusCircleIcon className="w-4 h-4" />
            {seeding ? "Generating..." : "Seed Data"}
          </button>

          <button
            onClick={async () => {
              const data = prepareDataForExport(pendaftar, "pendaftar");
              await exportToExcel(
                data,
                PENDAFTAR_COLUMNS,
                "pendaftar",
                "Daftar Pendaftar",
              );
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-emerald-600 border border-emerald-100 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-50 transition-all active:scale-95 shadow-sm"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Export Excel
          </button>

          <button
            onClick={handleHapusSemua}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-rose-600 border border-rose-100 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-rose-50 transition-all active:scale-95 shadow-sm"
          >
            <TrashIcon className="w-4 h-4" />
            Clear All
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari berdasarkan nama, NIK, atau kontak..."
            className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-medium placeholder:text-slate-400 focus:outline-hidden focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all shadow-sm"
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
                  Pendaftar
                </th>
                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Identitas (NIK)
                </th>
                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Kontak
                </th>
                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Status Verifikasi
                </th>
                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                        Synchronizing Data...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : paginatedPendaftar.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                        <MagnifyingGlassIcon className="w-10 h-10 text-slate-200" />
                      </div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                        No matching records found
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedPendaftar.map((item) => (
                  <tr
                    key={item.nik}
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-black text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
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
                    <td className="px-8 py-6 text-sm font-bold text-slate-600">
                      {item.no_hp}
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ring-inset ${
                          item.status === "terverifikasi"
                            ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                            : "bg-amber-50 text-amber-700 ring-amber-200"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${item.status === "terverifikasi" ? "bg-emerald-500" : "bg-amber-500"}`}
                        ></div>
                        {item.status === "terverifikasi"
                          ? "Verified Assets"
                          : "Pending Audit"}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openDetail(item)}
                          className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all active:scale-90"
                          title="Review Details"
                        >
                          <EyeIcon className="w-5 h-5" />
                        </button>
                        {item.status !== "terverifikasi" && (
                          <button
                            onClick={() => handleVerifikasiClick(item)}
                            className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all active:scale-90"
                            title="Assign Unit"
                          >
                            <CheckCircleIcon className="w-5 h-5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleHapus(item)}
                          className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all active:scale-90"
                          title="Trash Data"
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

        {/* Improved Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between px-8 py-6 bg-slate-50/30 border-t border-slate-50 gap-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Showing page {currentPage} of {totalPages}
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
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
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
        title="Berkas Pendaftaran"
        actions={
          selectedData?.status !== "terverifikasi" && (
            <button
              onClick={() => handleVerifikasiClick(selectedData)}
              className="px-8 py-3 bg-emerald-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-emerald-700 transition shadow-xl shadow-emerald-200"
            >
              Verify & Assign Unit
            </button>
          )
        }
      />

      <PilihUnitModal
        isOpen={isUnitModalOpen}
        onClose={() => setIsUnitModalOpen(false)}
        onSelect={handleUnitSelected}
        occupiedUnits={occupiedUnits}
      />
    </div>
  );
};

export default KelolaPendaftar;
