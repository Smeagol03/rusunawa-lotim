import React, { useState, useEffect, useMemo } from "react";
import {
  BellIcon,
  TrashIcon,
  CheckIcon,
  FunnelIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  QueueListIcon,
} from "@heroicons/react/24/outline";
import {
  UserPlusIcon,
  CheckCircleIcon,
  ArrowsRightLeftIcon,
  XCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import {
  listenToNotifikasi,
  tandaiDibaca,
  tandaiSemuaDibaca,
  hapusNotifikasi,
  hapusSemuaNotifikasi,
  NOTIFIKASI_CONFIG,
  TIPE_NOTIFIKASI,
} from "/src/config/notifikasi";
import {
  exportToExcel,
  AKTIVITAS_COLUMNS,
  prepareDataForExport,
} from "/src/config/exportExcel";

const iconMap = {
  UserPlusIcon,
  CheckCircleIcon,
  ArrowsRightLeftIcon,
  TrashIcon,
  ArrowPathIcon,
  XCircleIcon,
};

const Notifikasi = () => {
  const [notifikasi, setNotifikasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTipe, setFilterTipe] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const unsub = listenToNotifikasi((data) => {
      setNotifikasi(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const filteredNotifikasi = useMemo(() => {
    let result = notifikasi;
    if (filterTipe !== "all")
      result = result.filter((n) => n.tipe === filterTipe);
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((n) => n.pesan.toLowerCase().includes(query));
    }
    return result;
  }, [notifikasi, filterTipe, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterTipe]);

  const totalPages = Math.ceil(filteredNotifikasi.length / ITEMS_PER_PAGE);
  const paginatedNotifikasi = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredNotifikasi.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredNotifikasi, currentPage]);

  const formatTanggal = (timestamp) => {
    return new Date(timestamp).toLocaleString("id-ID", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getIcon = (tipe) => {
    const config = NOTIFIKASI_CONFIG[tipe] || NOTIFIKASI_CONFIG.pendaftar_baru;
    const IconComponent = iconMap[config.icon] || UserPlusIcon;
    return { IconComponent, ...config };
  };

  const handleMarkAllRead = async () => {
    if (confirm("Clear all unread alerts?")) await tandaiSemuaDibaca();
  };

  const handleDeleteAll = async () => {
    if (confirm("Permanently wipe activity history?"))
      await hapusSemuaNotifikasi();
  };

  const unreadCount = notifikasi.filter((n) => !n.dibaca).length;

  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-3">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            System Activity Log
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ring-slate-200">
              <QueueListIcon className="w-3.5 h-3.5" />
              {notifikasi.length} Events Total
            </span>
            {unreadCount > 0 && (
              <span className="flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ring-blue-100 animate-pulse">
                {unreadCount} Actions Required
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={async () => {
              const data = prepareDataForExport(notifikasi, "aktivitas");
              await exportToExcel(
                data,
                AKTIVITAS_COLUMNS,
                "log_aktivitas",
                "Log Aktivitas",
              );
            }}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-200"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Export Log
          </button>
          <button
            onClick={handleDeleteAll}
            className="flex items-center gap-2 px-6 py-3 bg-white text-rose-600 border border-rose-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 transition-all active:scale-95"
          >
            <TrashIcon className="w-4 h-4" />
            Wipe Logs
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search activity by keywords..."
            className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-[24px] text-sm font-medium focus:outline-hidden focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all shadow-sm"
          />
        </div>
        <div className="relative">
          <select
            value={filterTipe}
            onChange={(e) => setFilterTipe(e.target.value)}
            className="appearance-none w-full sm:w-56 px-6 py-4 pr-12 text-[10px] font-black text-slate-700 bg-white border border-slate-100 rounded-[24px] focus:outline-hidden focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all cursor-pointer shadow-sm uppercase tracking-widest"
          >
            <option value="all">ANY CATEGORY</option>
            {Object.entries(TIPE_NOTIFIKASI).map(([key, value]) => (
              <option key={value} value={value}>
                {key.replace(/_/g, " ")}
              </option>
            ))}
          </select>
          <FunnelIcon className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-900/5 overflow-hidden">
        {loading ? (
          <div className="px-8 py-24 text-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Compiling history...
            </p>
          </div>
        ) : filteredNotifikasi.length === 0 ? (
          <div className="px-8 py-32 text-center opacity-30">
            <BellIcon className="w-20 h-20 text-slate-300 mx-auto mb-6" />
            <p className="text-sm font-black text-slate-400 uppercase tracking-widest">
              No activity recorded
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {paginatedNotifikasi.map((item) => {
              const { IconComponent, color, bg } = getIcon(item.tipe);
              return (
                <div
                  key={item.id}
                  className={`group flex items-start gap-8 px-8 py-8 transition-all relative ${!item.dibaca ? "bg-blue-50/20" : "hover:bg-slate-50/50"}`}
                >
                  {!item.dibaca && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-blue-500 rounded-r-full"></div>
                  )}

                  <div
                    className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110`}
                  >
                    <IconComponent className={`w-6 h-6 ${color}`} />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        {item.tipe?.replace(/_/g, " ")}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 group-hover:text-slate-600 transition-colors uppercase tracking-widest">
                        {formatTanggal(item.timestamp)}
                      </p>
                    </div>
                    <p
                      className={`text-sm ${!item.dibaca ? "font-black text-slate-900" : "font-medium text-slate-500"}`}
                    >
                      {item.pesan}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!item.dibaca && (
                      <button
                        onClick={() => tandaiDibaca(item.id)}
                        className="p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all active:scale-95"
                        title="Dismiss alert"
                      >
                        <CheckIcon className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => hapusNotifikasi(item.id)}
                      className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all active:scale-95"
                      title="Delete log"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Improved Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between px-8 py-8 bg-slate-50/30 border-t border-slate-50 gap-6">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Events {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
              {Math.min(
                currentPage * ITEMS_PER_PAGE,
                filteredNotifikasi.length,
              )}{" "}
              of {filteredNotifikasi.length} logged
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-3 bg-white rounded-2xl border border-slate-100 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xs"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-1.5">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-11 h-11 rounded-2xl text-[10px] font-black transition-all ${
                      currentPage === i + 1
                        ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
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
                className="p-3 bg-white rounded-2xl border border-slate-100 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xs"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {unreadCount > 0 && (
        <div className="flex justify-center">
          <button
            onClick={handleMarkAllRead}
            className="group flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-[32px] text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-2xl"
          >
            <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
            Resolve All Pending Alerts
          </button>
        </div>
      )}
    </div>
  );
};

export default Notifikasi;
