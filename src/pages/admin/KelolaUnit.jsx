import React, { useEffect, useState, useMemo } from "react";
import {
  listenToPenghuni,
  updateUnitPenghuni,
  hapusPenghuni,
} from "/src/config/database";
import { UserIcon, HomeIcon, FunnelIcon } from "@heroicons/react/24/outline";
import SearchInput from "/src/components/admin/SearchInput";
import PilihUnitModal from "/src/components/admin/PilihUnitModal";

import { generateUnits } from "/src/config/unitConfig"; // Import Config

const KelolaUnit = () => {
  const [penghuni, setPenghuni] = useState([]);
  const [units, setUnits] = useState([]);

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // 'all' | 'occupied' | 'empty'

  // Modal State for Move Unit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOccupant, setSelectedOccupant] = useState(null);

  useEffect(() => {
    // Use shared filtered logic
    setUnits(generateUnits());

    const unsubscribe = listenToPenghuni((data) => {
      setPenghuni(data);
    });

    return () => unsubscribe();
  }, []);

  // Helper to find occupant
  const getOccupant = (unitId) => {
    return penghuni.find((p) => p.nomor_unit === unitId);
  };

  // Filtered units based on search and filter
  const filteredUnits = useMemo(() => {
    let result = units;

    // Filter by status
    if (filterStatus !== "all") {
      result = result.filter((unit) => {
        const occupant = getOccupant(unit.id);
        if (filterStatus === "occupied") return !!occupant;
        if (filterStatus === "empty") return !occupant;
        return true;
      });
    }

    // Filter by search query
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

  // Open modal for moving unit
  const handlePindahClick = (occupant) => {
    setSelectedOccupant(occupant);
    setIsModalOpen(true);
  };

  // Handle unit selection from modal
  const handleUnitSelected = async (newUnit) => {
    if (!selectedOccupant) return;

    const oldUnit = selectedOccupant.nomor_unit;

    if (newUnit === oldUnit) {
      alert("Unit yang dipilih sama dengan unit saat ini.");
      return;
    }

    if (
      window.confirm(
        `Pindahkan ${selectedOccupant.nama} dari Unit ${oldUnit} ke Unit ${newUnit}?`
      )
    ) {
      try {
        await updateUnitPenghuni(
          selectedOccupant.nik,
          newUnit,
          selectedOccupant.nama
        );
        alert(
          `Berhasil! ${selectedOccupant.nama} dipindahkan ke Unit ${newUnit}.`
        );
        setIsModalOpen(false);
        setSelectedOccupant(null);
      } catch (e) {
        alert("Gagal: " + e.message);
      }
    }
  };

  const handleHapus = async (occupant) => {
    if (
      window.confirm(
        `Yakin ingin menghapus ${occupant.nama}? Data akan dipindah ke Keranjang Sampah (bisa dipulihkan).`
      )
    ) {
      try {
        // Pass the full object so it can be saved to trash
        await hapusPenghuni(occupant);
        alert("Penghuni berhasil dipindahkan ke sampah.");
      } catch (e) {
        alert("Gagal: " + e.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Kelola Unit Rusun
          </h1>
          <div className="flex gap-2 mt-1 flex-wrap">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              Total: {units.length}
            </span>
            <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
              Terisi: {penghuni.length}
            </span>
            <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
              Kosong: {units.length - penghuni.length}
            </span>
            {(searchQuery || filterStatus !== "all") && (
              <span className="bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full">
                Ditemukan: {filteredUnits.length}
              </span>
            )}
          </div>
        </div>
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="w-full sm:w-64">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Cari unit atau nama penghuni..."
            />
          </div>
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none w-full sm:w-40 px-4 py-2.5 pr-8 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all cursor-pointer"
            >
              <option value="all">Semua Unit</option>
              <option value="occupied">Terisi</option>
              <option value="empty">Kosong</option>
            </select>
            <FunnelIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {filteredUnits.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <HomeIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">
            {searchQuery || filterStatus !== "all"
              ? "Tidak ada unit yang cocok."
              : "Belum ada data unit."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredUnits.map((unit) => {
            const occupant = getOccupant(unit.id);
            const isOccupied = !!occupant;

            return (
              <div
                key={unit.id}
                className={`relative p-5 rounded-xl border transition-all duration-200 ${
                  isOccupied
                    ? "bg-red-50 border-red-200 shadow-sm"
                    : "bg-white border-green-200 hover:shadow-md hover:border-green-300"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <HomeIcon
                      className={`w-5 h-5 ${
                        isOccupied ? "text-red-500" : "text-green-500"
                      }`}
                    />
                    <span
                      className={`font-bold text-lg ${
                        isOccupied ? "text-red-800" : "text-green-700"
                      }`}
                    >
                      {unit.id}
                    </span>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-bold ${
                      isOccupied
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {isOccupied ? "TERISI" : "KOSONG"}
                  </span>
                </div>

                {isOccupied ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-red-900">
                      <UserIcon className="w-4 h-4" />
                      <span className="font-medium truncate">
                        {occupant.nama}
                      </span>
                    </div>
                    <div className="flex gap-2 pt-2 border-t border-red-100">
                      <button
                        onClick={() => handlePindahClick(occupant)}
                        className="flex-1 text-xs bg-white text-red-600 border border-red-200 py-1.5 rounded hover:bg-red-50"
                      >
                        Pindah
                      </button>
                      <button
                        onClick={() => handleHapus(occupant)}
                        className="flex-1 text-xs bg-red-600 text-white py-1.5 rounded hover:bg-red-700"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-16 flex items-center justify-center text-green-600/50 text-xs italic">
                    Siap Huni
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Unit Selection Modal for Move */}
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
            ? `Pindahkan ${selectedOccupant.nama}`
            : "Pilih Unit Baru"
        }
      />
    </div>
  );
};

export default KelolaUnit;
