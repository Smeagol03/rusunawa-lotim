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
  MagnifyingGlassIcon,
  TrashIcon as TrashIconSolid,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import SearchInput from "/src/components/admin/SearchInput";
import KonfirmasiModal from "/src/components/admin/KonfirmasiModal";

const KeranjangSampah = () => {
  const [activeTab, setActiveTab] = useState("pendaftar");
  const [dataPendaftar, setDataPendaftar] = useState([]);
  const [dataPenghuni, setDataPenghuni] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
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

  useEffect(() => {
    setSelectedIds(new Set());
    setSearchQuery("");
  }, [activeTab]);

  const currentData = activeTab === "pendaftar" ? dataPendaftar : dataPenghuni;

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return currentData;
    const query = searchQuery.toLowerCase();
    return currentData.filter(
      (item) =>
        item.nama?.toLowerCase().includes(query) ||
        item.nik?.toLowerCase().includes(query),
    );
  }, [currentData, searchQuery]);

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
    if (selectedIds.size === filteredData.length) {
      setSelectedIds(new Set());
    } else {
      const allIds = new Set(filteredData.map((item) => item.nik));
      setSelectedIds(allIds);
    }
  };

  const handleRestore = async () => {
    if (selectedIds.size === 0) return;
    if (confirm(`Restore ${selectedIds.size} items?`)) {
      try {
        const promises = Array.from(selectedIds).map((id) => {
          const item = currentData.find((d) => d.nik === id);
          return activeTab === "pendaftar"
            ? pulihkanPendaftar(item)
            : pulihkanPenghuni(item);
        });
        await Promise.all(promises);
        setSelectedIds(new Set());
      } catch (e) {
        alert("Gagal memulihkan: " + e.message);
      }
    }
  };

  const handleDeletePermanentClick = () => {
    if (selectedIds.size === 0) return;
    setIsDeleteModalOpen(true);
  };

  const executeDeletePermanent = async () => {
    try {
      const promises = Array.from(selectedIds).map((id) => {
        return activeTab === "pendaftar"
          ? hapusPermanenPendaftar(id)
          : hapusPermanenPenghuni(id);
      });
      await Promise.all(promises);
      setSelectedIds(new Set());
      setIsDeleteModalOpen(false);
    } catch (e) {
      alert("Gagal menghapus: " + e.message);
    }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Header & Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Audit Archive
          </h1>
          <div className="inline-flex p-1.5 bg-slate-100 rounded-[20px]">
            <button
              onClick={() => setActiveTab("pendaftar")}
              className={`px-6 py-2.5 rounded-[16px] text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === "pendaftar"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Applicants ({dataPendaftar.length})
            </button>
            <button
              onClick={() => setActiveTab("penghuni")}
              className={`px-6 py-2.5 rounded-[16px] text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === "penghuni"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Residents ({dataPenghuni.length})
            </button>
          </div>
        </div>

        {selectedIds.size > 0 && (
          <div className="flex items-center gap-3 animate-slideUp">
            <button
              onClick={handleRestore}
              className="px-6 py-3 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-200 flex items-center gap-2"
            >
              <ArrowPathIcon className="w-4 h-4" />
              Restore Selection
            </button>
            <button
              onClick={handleDeletePermanentClick}
              className="px-6 py-3 bg-rose-50 text-rose-600 border border-rose-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-100 transition-all active:scale-95 flex items-center gap-2"
            >
              <TrashIcon className="w-4 h-4" />
              Wipe Permanently
            </button>
          </div>
        )}
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 group-focus-within:text-rose-500 transition-colors" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter archive by identity or name..."
            className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-[24px] text-sm font-medium focus:outline-hidden focus:ring-4 focus:ring-rose-500/5 focus:border-rose-500 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Data Section */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-900/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-6 w-10">
                  <input
                    type="checkbox"
                    checked={
                      filteredData.length > 0 &&
                      selectedIds.size === filteredData.length
                    }
                    onChange={toggleSelectAll}
                    className="w-5 h-5 rounded-[6px] border-slate-200 text-rose-600 focus:ring-rose-500 focus:ring-offset-0"
                  />
                </th>
                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Subject
                </th>
                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Identity (NIK)
                </th>
                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Deletion Date
                </th>
                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Origin
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                        Reviewing Archive...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-8 py-32 text-center">
                    <div className="flex flex-col items-center gap-4 opacity-30">
                      <TrashIconSolid className="w-20 h-20 text-slate-300" />
                      <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">
                        Empty Archive
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr
                    key={item.nik}
                    className={`group hover:bg-slate-50/50 transition-colors cursor-pointer ${selectedIds.has(item.nik) ? "bg-rose-50/30" : ""}`}
                    onClick={() => toggleSelect(item.nik)}
                  >
                    <td className="px-8 py-6">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(item.nik)}
                        onChange={() => {}}
                        className="w-5 h-5 rounded-[6px] border-slate-200 text-rose-600 focus:ring-rose-500 focus:ring-offset-0"
                      />
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-black text-slate-400 transition-colors group-hover:bg-rose-100 group-hover:text-rose-600">
                          {item.nama?.charAt(0)}
                        </div>
                        <span className="text-sm font-black text-slate-900">
                          {item.nama}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <code className="text-xs font-bold text-slate-500">
                        {item.nik}
                      </code>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-xs font-bold text-slate-400">
                        {item.tanggal_dihapus
                          ? new Date(item.tanggal_dihapus).toLocaleString(
                              "id-ID",
                            )
                          : "N/A"}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ring-inset ${
                          activeTab === "penghuni"
                            ? "bg-rose-50 text-rose-700 ring-rose-200"
                            : "bg-amber-50 text-amber-700 ring-amber-200"
                        }`}
                      >
                        {activeTab === "penghuni"
                          ? "Former Resident"
                          : "Former Applicant"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Advisory Info */}
      <div className="bg-slate-900 rounded-[32px] p-8 border border-slate-800 flex items-start gap-6 shadow-2xl">
        <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center shrink-0">
          <ShieldCheckIcon className="w-7 h-7 text-emerald-500" />
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-black text-white uppercase tracking-widest">
            Procedural Notice
          </h4>
          <p className="text-slate-400 text-sm font-light leading-relaxed">
            Restoring data will move residents back to{" "}
            <span className="text-amber-400 font-bold">Pending Audit</span>{" "}
            status. They will require re-verification and a new unit assignment
            to become active again in the system.
          </p>
        </div>
      </div>

      <KonfirmasiModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={executeDeletePermanent}
        title="Wipe Archive Permanently"
        message="This action is irreversible. The selected records will be purged from the database forever."
        confirmWord="PURGE DATA"
        itemCount={selectedIds.size}
      />
    </div>
  );
};

export default KeranjangSampah;
