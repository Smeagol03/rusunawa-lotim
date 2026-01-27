import React, { useEffect, useState } from "react";
import { database } from "/src/config/firebase";
import { ref, onValue, update, remove } from "firebase/database";
import {
  CheckCircleIcon,
  TrashIcon,
  PhoneIcon,
  ClockIcon,
  ExclamationCircleIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import SearchInput from "/src/components/admin/SearchInput";
import {
  exportToExcel,
  LAPORAN_COLUMNS,
  prepareDataForExport,
} from "/src/config/exportExcel";

const Pelaporan = () => {
  const [laporanList, setLaporanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredList = laporanList.filter((laporan) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      laporan.nama?.toLowerCase().includes(query) ||
      laporan.nohp?.toLowerCase().includes(query) ||
      laporan.laporan?.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    const laporanRef = ref(database, "laporan");
    const unsubscribe = onValue(laporanRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        dataArray.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
        setLaporanList(dataArray);
      } else {
        setLaporanList([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      const laporanRef = ref(database, `laporan/${id}`);
      await update(laporanRef, { status: "read" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Permanently delete this report?")) return;
    try {
      const laporanRef = ref(database, `laporan/${id}`);
      await remove(laporanRef);
    } catch (error) {
      console.error(error);
    }
  };

  const handleHapusSemua = async () => {
    if (laporanList.length === 0) return;
    if (confirm(`Wipe ALL ${laporanList.length} reports?`)) {
      try {
        const deletePromises = laporanList.map((laporan) =>
          remove(ref(database, `laporan/${laporan.id}`)),
        );
        await Promise.all(deletePromises);
      } catch (error) {
        alert("Gagal: " + error.message);
      }
    }
  };

  const handleExportExcel = async () => {
    const data = prepareDataForExport(laporanList, "laporan");
    await exportToExcel(
      data,
      LAPORAN_COLUMNS,
      "laporan_keluhan",
      "Laporan Keluhan",
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-12 h-12 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          Synchronizing reports...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-3">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Citizen Feedback
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ring-indigo-100">
              <ChatBubbleLeftRightIcon className="w-3.5 h-3.5" />
              {laporanList.length} Reports Logged
            </span>
            {laporanList.some((l) => l.status === "unread") && (
              <span className="flex items-center gap-2 px-4 py-1.5 bg-rose-50 text-rose-700 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ring-rose-100 animate-pulse">
                New Alerts Detected
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-200"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Export Archive
          </button>
          <button
            onClick={handleHapusSemua}
            className="flex items-center gap-2 px-6 py-3 bg-white text-rose-600 border border-rose-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 transition-all active:scale-95 shadow-sm"
          >
            <TrashIcon className="w-4 h-4" />
            Purge Feed
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex-1 relative group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter by reporter name, phone number, or content keywords..."
          className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-[24px] text-sm font-medium focus:outline-hidden focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all shadow-sm"
        />
      </div>

      {/* Reports List */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredList.length === 0 ? (
          <div className="col-span-full bg-slate-50/50 rounded-[40px] border-2 border-dashed border-slate-200 p-24 text-center">
            <ExclamationCircleIcon className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-sm">
              No feedback records found
            </p>
          </div>
        ) : (
          filteredList.map((laporan) => (
            <div
              key={laporan.id}
              className={`group relative p-8 rounded-[40px] border transition-all duration-500 ${
                laporan.status === "unread"
                  ? "bg-white border-indigo-100 shadow-2xl shadow-indigo-900/5 ring-1 ring-indigo-50"
                  : "bg-white border-slate-50 hover:border-slate-200"
              }`}
            >
              {laporan.status === "unread" && (
                <div className="absolute top-8 right-8">
                  <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                  </span>
                </div>
              )}

              <div className="flex flex-col h-full gap-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-colors ${
                        laporan.status === "unread"
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {laporan.nama?.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 tracking-tight uppercase">
                        {laporan.nama}
                      </h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                        Verified Resident
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100/50 group-hover:bg-slate-100/50 transition-colors">
                    <p className="text-sm text-slate-600 leading-relaxed font-medium capitalize">
                      {laporan.laporan}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <ClockIcon className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-tight">
                        {laporan.tanggal
                          ? new Date(laporan.tanggal).toLocaleString("id-ID", {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "N/A"}
                      </span>
                    </div>
                    <a
                      href={`https://wa.me/62${laporan.nohp?.replace(/^0/, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      <PhoneIcon className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-tight underline border-emerald-100 underline-offset-4">
                        {laporan.nohp}
                      </span>
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    {laporan.status === "unread" && (
                      <button
                        onClick={() => handleMarkAsRead(laporan.id)}
                        className="p-2.5 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all active:scale-95"
                        title="Resolve Issue"
                      >
                        <CheckCircleIcon className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(laporan.id)}
                      className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all active:scale-95"
                      title="Dismiss Report"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Pelaporan;
