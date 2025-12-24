import React, { useState, useEffect, useMemo } from "react";
import {
  BellIcon,
  TrashIcon,
  CheckIcon,
  FunnelIcon,
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import {
  UserPlusIcon,
  CheckCircleIcon,
  ArrowsRightLeftIcon,
  XCircleIcon,
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
import SearchInput from "/src/components/admin/SearchInput";
import {
  exportToExcel,
  AKTIVITAS_COLUMNS,
  prepareDataForExport,
} from "/src/config/exportExcel";

// Icon mapping
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

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;

  useEffect(() => {
    const unsub = listenToNotifikasi((data) => {
      setNotifikasi(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Filtered notifications
  const filteredNotifikasi = useMemo(() => {
    let result = notifikasi;

    // Filter by type
    if (filterTipe !== "all") {
      result = result.filter((n) => n.tipe === filterTipe);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((n) => n.pesan.toLowerCase().includes(query));
    }

    return result;
  }, [notifikasi, filterTipe, searchQuery]);

  // Reset to page 1 when search/filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterTipe]);

  // Paginated data
  const totalPages = Math.ceil(filteredNotifikasi.length / ITEMS_PER_PAGE);
  const paginatedNotifikasi = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredNotifikasi.slice(start, end);
  }, [filteredNotifikasi, currentPage]);

  // Format date
  const formatTanggal = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get icon component
  const getIcon = (tipe) => {
    const config = NOTIFIKASI_CONFIG[tipe] || NOTIFIKASI_CONFIG.pendaftar_baru;
    const IconComponent = iconMap[config.icon] || UserPlusIcon;
    return { IconComponent, ...config };
  };

  // Handlers
  const handleMarkAllRead = async () => {
    if (window.confirm("Tandai semua notifikasi sebagai sudah dibaca?")) {
      await tandaiSemuaDibaca();
    }
  };

  const handleDeleteAll = async () => {
    if (
      window.confirm(
        "Hapus semua notifikasi? Tindakan ini tidak dapat dibatalkan."
      )
    ) {
      await hapusSemuaNotifikasi();
    }
  };

  const handleDelete = async (id) => {
    await hapusNotifikasi(id);
  };

  const handleMarkRead = async (id) => {
    await tandaiDibaca(id);
  };

  // Stats
  const unreadCount = notifikasi.filter((n) => !n.dibaca).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Log Aktivitas</h1>
          <div className="flex gap-2 mt-1 flex-wrap">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              Total: {notifikasi.length}
            </span>
            {unreadCount > 0 && (
              <span className="bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full">
                Belum Dibaca: {unreadCount}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="flex items-center gap-1 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
            >
              <CheckIcon className="w-4 h-4" />
              Tandai Dibaca
            </button>
          )}
          {notifikasi.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="flex items-center gap-1 px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
            >
              <TrashIcon className="w-4 h-4" />
              Hapus Semua
            </button>
          )}
          {notifikasi.length > 0 && (
            <button
              onClick={async () => {
                const data = prepareDataForExport(notifikasi, "aktivitas");
                await exportToExcel(
                  data,
                  AKTIVITAS_COLUMNS,
                  "log_aktivitas",
                  "Log Aktivitas"
                );
              }}
              className="flex items-center gap-1 px-3 py-2 text-sm bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              Export Excel
            </button>
          )}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 max-w-md">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Cari aktivitas..."
          />
        </div>
        <div className="relative">
          <select
            value={filterTipe}
            onChange={(e) => setFilterTipe(e.target.value)}
            className="appearance-none w-full sm:w-48 px-4 py-2.5 pr-8 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all cursor-pointer"
          >
            <option value="all">Semua Tipe</option>
            <option value={TIPE_NOTIFIKASI.PENDAFTAR_BARU}>
              Pendaftar Baru
            </option>
            <option value={TIPE_NOTIFIKASI.VERIFIKASI}>Verifikasi</option>
            <option value={TIPE_NOTIFIKASI.PINDAH_UNIT}>Pindah Unit</option>
            <option value={TIPE_NOTIFIKASI.HAPUS_PENGHUNI}>
              Hapus Penghuni
            </option>
            <option value={TIPE_NOTIFIKASI.HAPUS_PENDAFTAR}>
              Hapus Pendaftar
            </option>
            <option value={TIPE_NOTIFIKASI.PULIHKAN}>Pulihkan</option>
          </select>
          <FunnelIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Notification List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="px-6 py-12 text-center text-gray-500">
            Memuat data...
          </div>
        ) : filteredNotifikasi.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <BellIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">
              {searchQuery || filterTipe !== "all"
                ? "Tidak ada hasil yang cocok."
                : "Belum ada log aktivitas."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {paginatedNotifikasi.map((item) => {
              const { IconComponent, color, bg } = getIcon(item.tipe);
              return (
                <div
                  key={item.id}
                  className={`flex items-start gap-4 px-6 py-4 hover:bg-gray-50 transition-colors ${
                    !item.dibaca ? "bg-blue-50/30" : ""
                  }`}
                >
                  <div className={`p-2.5 rounded-full ${bg} shrink-0`}>
                    <IconComponent className={`w-5 h-5 ${color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm ${
                        !item.dibaca
                          ? "font-medium text-slate-800"
                          : "text-slate-600"
                      }`}
                    >
                      {item.pesan}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatTanggal(item.timestamp)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {!item.dibaca && (
                      <button
                        onClick={() => handleMarkRead(item.id)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition"
                        title="Tandai dibaca"
                      >
                        <CheckIcon className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded transition"
                      title="Hapus"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4">
          <div className="text-sm text-gray-600">
            Menampilkan {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredNotifikasi.length)}{" "}
            dari {filteredNotifikasi.length} log
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
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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
  );
};

export default Notifikasi;
