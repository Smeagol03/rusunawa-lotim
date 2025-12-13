import React, { useEffect, useState } from "react";
import {
  listenToPenghuni,
  updateUnitPenghuni,
  hapusPenghuni,
} from "/src/config/database";
import { UserIcon, HomeIcon } from "@heroicons/react/24/outline";

import { generateUnits } from "/src/config/unitConfig"; // Import Config

const KelolaUnit = () => {
  const [penghuni, setPenghuni] = useState([]);
  const [units, setUnits] = useState([]);

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

  const handlePindah = async (occupant) => {
    const newUnit = prompt(
      "Masukkan Nomor Unit Baru (Contoh: 02-5):",
      occupant.nomor_unit
    );
    if (newUnit && newUnit !== occupant.nomor_unit) {
      if (window.confirm(`Pindahkan ${occupant.nama} ke ${newUnit}?`)) {
        try {
          await updateUnitPenghuni(occupant.nik, newUnit);
          alert("Berhasil pindah unit!");
        } catch (e) {
          alert("Gagal: " + e.message);
        }
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Kelola Unit Rusun</h1>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-100 border border-red-200 rounded-full"></span>{" "}
            Terisi
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-50 border border-green-200 rounded-full"></span>{" "}
            Kosong
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {units.map((unit) => {
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
                      onClick={() => handlePindah(occupant)}
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
    </div>
  );
};

export default KelolaUnit;
