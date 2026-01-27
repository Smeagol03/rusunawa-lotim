import React, { useEffect, useState, useMemo } from "react";
import {
  listenToPenghuni,
  updateUnitPenghuni,
  hapusPenghuni,
} from "/src/config/database";
import {
  UserIcon,
  HomeIcon,
  FunnelIcon,
  Squares2X2Icon,
  ArrowRightStartOnRectangleIcon,
  ArchiveBoxIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import SearchInput from "/src/components/admin/SearchInput";
import PilihUnitModal from "/src/components/admin/PilihUnitModal";
import { generateUnits } from "/src/config/unitConfig";

const KelolaUnit = () => {
  const [penghuni, setPenghuni] = useState([]);
  const [units, setUnits] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOccupant, setSelectedOccupant] = useState(null);

  useEffect(() => {
    setUnits(generateUnits());
    const unsubscribe = listenToPenghuni((data) => {
      setPenghuni(data);
    });
    return () => unsubscribe();
  }, []);

  const getOccupant = (unitId) => {
    return penghuni.find((p) => p.nomor_unit === unitId);
  };

  const filteredUnits = useMemo(() => {
    let result = units;
    if (filterStatus !== "all") {
      result = result.filter((unit) => {
        const occupant = getOccupant(unit.id);
        if (filterStatus === "occupied") return !!occupant;
        if (filterStatus === "empty") return !occupant;
        return true;
      });
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((unit) => {
        const occupant = getOccupant(unit.id);
        return (
          unit.id.toLowerCase().includes(query) ||
          unit.label.toLowerCase().includes(query) ||
          (occupant && occupant.nama?.toLowerCase().includes(query))
        );
      });
    }
    return result;
  }, [units, penghuni, searchQuery, filterStatus]);

  const handlePindahClick = (occupant) => {
    setSelectedOccupant(occupant);
    setIsModalOpen(true);
  };

  const handleUnitSelected = async (newUnit) => {
    if (!selectedOccupant) return;
    const oldUnit = selectedOccupant.nomor_unit;
    if (newUnit === oldUnit) return;

    try {
      await updateUnitPenghuni(
        selectedOccupant.nik,
        newUnit,
        selectedOccupant.nama,
      );
      setIsModalOpen(false);
      setSelectedOccupant(null);
    } catch (e) {
      alert("Gagal: " + e.message);
    }
  };

  const handleHapus = async (occupant) => {
    if (confirm(`Pindahkan ${occupant.nama} ke Sampah?`)) {
      try {
        await hapusPenghuni(occupant);
      } catch (e) {
        alert("Gagal: " + e.message);
      }
    }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Header & Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-3">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Manajemen Aset Unit
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ring-slate-200">
              <Squares2X2Icon className="w-3.5 h-3.5" />
              {units.length} Unit Total
            </span>
            <span className="flex items-center gap-2 px-4 py-1.5 bg-rose-50 text-rose-700 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ring-rose-100">
              <UserIcon className="w-3.5 h-3.5" />
              {penghuni.length} Terisi
            </span>
            <span className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ring-emerald-100">
              <HomeIcon className="w-3.5 h-3.5" />
              {units.length - penghuni.length} Tersedia
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative group min-w-[300px]">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by unit ID or resident name..."
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-[24px] text-sm font-medium focus:outline-hidden focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all shadow-sm"
            />
          </div>
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none w-full sm:w-44 px-6 py-4 pr-12 text-sm font-black text-slate-700 bg-white border border-slate-100 rounded-[24px] focus:outline-hidden focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all cursor-pointer shadow-sm uppercase tracking-widest"
            >
              <option value="all">ALL STATUS</option>
              <option value="occupied">OCCUPIED</option>
              <option value="empty">AVAILABLE</option>
            </select>
            <FunnelIcon className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Grid of Units */}
      {filteredUnits.length === 0 ? (
        <div className="bg-slate-50/50 rounded-[40px] border-2 border-dashed border-slate-200 p-24 text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <ArchiveBoxIcon className="w-10 h-10 text-slate-200" />
          </div>
          <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-sm">
            No units match your criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUnits.map((unit) => {
            const occupant = getOccupant(unit.id);
            const isOccupied = !!occupant;

            return (
              <div
                key={unit.id}
                className={`group relative p-8 rounded-[40px] border transition-all duration-500 overflow-hidden ${
                  isOccupied
                    ? "bg-white border-rose-100/50 shadow-2xl shadow-rose-900/5"
                    : "bg-white border-emerald-100/50 hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-900/10"
                }`}
              >
                {/* Visual Accent */}
                <div
                  className={`absolute top-0 right-0 w-24 h-24 rounded-bl-[60px] opacity-10 ${isOccupied ? "bg-rose-500" : "bg-emerald-500"}`}
                ></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-10">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        Unit Identification
                      </p>
                      <h3
                        className={`text-3xl font-black tracking-tight ${isOccupied ? "text-rose-900" : "text-emerald-900"}`}
                      >
                        {unit.id}
                      </h3>
                    </div>
                    <div
                      className={`p-3 rounded-2xl ${isOccupied ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"}`}
                    >
                      <HomeIcon className="w-6 h-6" />
                    </div>
                  </div>

                  {isOccupied ? (
                    <div className="mt-auto space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 group/user">
                          <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center font-black text-rose-600 transition-transform group-hover/user:scale-110">
                            {occupant.nama?.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              Resident
                            </p>
                            <p className="text-sm font-black text-slate-900 truncate uppercase mt-0.5">
                              {occupant.nama}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-6 border-t border-slate-50">
                        <button
                          onClick={() => handlePindahClick(occupant)}
                          className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
                        >
                          <ArrowRightStartOnRectangleIcon className="w-4 h-4" />
                          Relocate
                        </button>
                        <button
                          onClick={() => handleHapus(occupant)}
                          className="flex items-center justify-center gap-2 px-4 py-3 bg-rose-50 text-rose-600 border border-rose-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-100 transition-all active:scale-95"
                        >
                          <TrashIcon className="w-4 h-4" />
                          Evict
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-auto flex flex-col items-center justify-center py-12 border-2 border-dashed border-emerald-50 rounded-[32px] group-hover:bg-emerald-50/50 transition-colors">
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">
                        Status: Operational
                      </p>
                      <p className="text-sm font-black text-emerald-900 tracking-tight">
                        READY TO OCCUPY
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Relocation Modal */}
      <PilihUnitModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOccupant(null);
        }}
        onSelect={handleUnitSelected}
        occupiedUnits={penghuni.map((p) => p.nomor_unit).filter(Boolean)}
        title={
          selectedOccupant
            ? `RELOCATE: ${selectedOccupant.nama}`
            : "CHOOSE NEW UNIT"
        }
      />
    </div>
  );
};

export default KelolaUnit;
