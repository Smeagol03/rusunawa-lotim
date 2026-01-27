import Pelaporan from "./Pelaporan";
import React, { useEffect, useState } from "react";
import {
  listenToPenghuni,
  listenToSampahPendaftar,
  listenToSampahPenghuni,
} from "/src/config/database";
import { generateUnits } from "/src/config/unitConfig";
import {
  BuildingOfficeIcon,
  UserGroupIcon,
  TrashIcon,
  HomeModernIcon,
  ArrowTrendingUpIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const [counts, setCounts] = useState({
    totalUnits: 0,
    occupiedUnits: 0,
    emptyUnits: 0,
    trashCount: 0,
  });

  useEffect(() => {
    const allUnits = generateUnits();
    const totalUnitsCount = allUnits.length;

    const unsubPenghuni = listenToPenghuni((data) => {
      const occupiedCount = data.length;
      setCounts((prev) => ({
        ...prev,
        totalUnits: totalUnitsCount,
        occupiedUnits: occupiedCount,
        emptyUnits: totalUnitsCount - occupiedCount,
      }));
    });

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
    {
      title: "Kapasitas Unit",
      value: counts.totalUnits,
      sub: "Total Kamar",
      icon: BuildingOfficeIcon,
      color: "emerald",
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },
    {
      title: "Penghuni Aktif",
      value: counts.occupiedUnits,
      sub: "Unit Terisi",
      icon: UserGroupIcon,
      color: "blue",
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "Unit Tersedia",
      value: counts.emptyUnits,
      sub: "Kamar Kosong",
      icon: HomeModernIcon,
      color: "amber",
      bg: "bg-amber-50",
      text: "text-amber-600",
    },
    {
      title: "Log Sampah",
      value: counts.trashCount,
      sub: "Data Terhapus",
      icon: TrashIcon,
      color: "rose",
      bg: "bg-rose-50",
      text: "text-rose-600",
    },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Executive Dashboard
          </h1>
          <p className="text-slate-500 font-medium italic">
            Welcome back to the command center.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-slate-900 leading-none">
              Admin Perkim
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative bg-white p-8 rounded-[36px] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden"
          >
            {/* Minimal Pattern Overlay */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-[60px] group-hover:bg-emerald-50 transition-colors duration-500"></div>

            <div className="relative z-10 space-y-6">
              <div
                className={`w-14 h-14 ${stat.bg} ${stat.text} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}
              >
                <stat.icon className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <p className="text-4xl font-black text-slate-900 tracking-tighter">
                  {stat.value}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    {stat.title}
                  </span>
                  <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                  <span className="text-[10px] font-bold text-slate-500">
                    {stat.sub}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 gap-10">
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden min-h-[500px]">
          <div className="px-8 py-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-600 rounded-xl text-white">
                <ArrowTrendingUpIcon className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-slate-900">
                Pelaporan Terbaru
              </h2>
            </div>
          </div>
          <div className="p-4 sm:p-8" id="laporan">
            <Pelaporan />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
