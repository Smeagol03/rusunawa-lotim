import Pelaporan from "./Pelaporan";
import React, { useEffect, useState } from "react";
import {
  listenToPenghuni,
  listenToSampahPendaftar,
  listenToSampahPenghuni,
} from "/src/config/database";
import { generateUnits } from "/src/config/unitConfig";

const Dashboard = () => {
  const [counts, setCounts] = useState({
    totalUnits: 0,
    occupiedUnits: 0,
    emptyUnits: 0,
    trashCount: 0,
  });

  useEffect(() => {
    // 1. Get Total Units (Static/Config)
    const allUnits = generateUnits();
    const totalUnitsCount = allUnits.length;

    // 2. Listen to Occupied Units
    const unsubPenghuni = listenToPenghuni((data) => {
      const occupiedCount = data.length;
      setCounts((prev) => ({
        ...prev,
        totalUnits: totalUnitsCount,
        occupiedUnits: occupiedCount,
        emptyUnits: totalUnitsCount - occupiedCount,
      }));
    });

    // 3. Listen to Trash (Pendaftar + Penghuni)
    let pendaftarTrash = 0;
    let penghuniTrash = 0;

    const updateTrash = () => {
      setCounts((prev) => ({
        ...prev,
        trashCount: pendaftarTrash + penghuniTrash,
      }));
    };

    const unsubSampahPendaftar = listenToSampahPendaftar((data) => {
      pendaftarTrash = data ? data.length : 0;
      updateTrash();
    });

    const unsubSampahPenghuni = listenToSampahPenghuni((data) => {
      penghuniTrash = data ? data.length : 0;
      updateTrash();
    });

    return () => {
      unsubPenghuni();
      unsubSampahPendaftar();
      unsubSampahPenghuni();
    };
  }, []);

  const stats = [
    { title: "Total Kamar", value: counts.totalUnits },
    { title: "Kamar Terisi", value: counts.occupiedUnits },
    { title: "Kamar Kosong", value: counts.emptyUnits },
    { title: "Keranjang", value: counts.trashCount },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
          >
            <h3 className="text-slate-500 text-sm font-medium">{stat.title}</h3>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-bold text-slate-800">
                {stat.value}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div id="laporan">
        <Pelaporan />
      </div>
    </div>
  );
};

export default Dashboard;
