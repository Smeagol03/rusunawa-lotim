import React, { useState, useEffect, useRef } from "react";
import { BellIcon, CheckIcon, EyeIcon } from "@heroicons/react/24/outline";
import {
  UserPlusIcon,
  CheckCircleIcon,
  ArrowsRightLeftIcon,
  TrashIcon,
  ArrowPathIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import {
  listenToNotifikasiTerbaru,
  listenToUnreadCount,
  tandaiDibaca,
  tandaiSemuaDibaca,
  NOTIFIKASI_CONFIG,
} from "/src/config/notifikasi";

// Icon mapping
const iconMap = {
  UserPlusIcon,
  CheckCircleIcon,
  ArrowsRightLeftIcon,
  TrashIcon,
  ArrowPathIcon,
  XCircleIcon,
};

const NotifikasiDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifikasi, setNotifikasi] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Listen for notifications
  useEffect(() => {
    const unsubNotif = listenToNotifikasiTerbaru((data) => {
      setNotifikasi(data);
    }, 10);

    const unsubCount = listenToUnreadCount((count) => {
      setUnreadCount(count);
    });

    return () => {
      unsubNotif();
      unsubCount();
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format relative time
  const formatWaktu = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diff = Math.floor((now - date) / 1000); // in seconds

    if (diff < 60) return "Baru saja";
    if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} hari lalu`;
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  };

  // Get icon component
  const getIcon = (tipe) => {
    const config = NOTIFIKASI_CONFIG[tipe] || NOTIFIKASI_CONFIG.pendaftar_baru;
    const IconComponent = iconMap[config.icon] || UserPlusIcon;
    return { IconComponent, ...config };
  };

  // Handle mark as read
  const handleMarkRead = async (id, e) => {
    e.stopPropagation();
    await tandaiDibaca(id);
  };

  // Handle mark all as read
  const handleMarkAllRead = async () => {
    await tandaiSemuaDibaca();
  };

  // Handle view all
  const handleViewAll = () => {
    setIsOpen(false);
    navigate("/admin/notifikasi");
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-500 hover:text-blue-600 transition-colors relative"
      >
        <BellIcon className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold text-white bg-red-500 rounded-full px-1">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute -right-20 md:right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-linear-to-r from-slate-50 to-white border-b border-gray-100">
            <h3 className="font-semibold text-slate-800">Notifikasi</h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                <CheckIcon className="w-3 h-3" />
                Tandai dibaca
              </button>
            )}
          </div>

          {/* Notification List */}
          <div className="max-h-80 overflow-y-auto">
            {notifikasi.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500">
                <BellIcon className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Belum ada notifikasi</p>
              </div>
            ) : (
              notifikasi.map((item) => {
                const { IconComponent, color, bg } = getIcon(item.tipe);
                return (
                  <div
                    key={item.id}
                    className={`flex items-start gap-3 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${
                      !item.dibaca ? "bg-blue-50/50" : ""
                    }`}
                    onClick={(e) => handleMarkRead(item.id, e)}
                  >
                    <div className={`p-2 rounded-full ${bg} shrink-0`}>
                      <IconComponent className={`w-4 h-4 ${color}`} />
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
                      <p className="text-xs text-gray-400 mt-0.5">
                        {formatWaktu(item.timestamp)}
                      </p>
                    </div>
                    {!item.dibaca && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></span>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
            <button
              onClick={handleViewAll}
              className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-1"
            >
              <EyeIcon className="w-4 h-4" />
              Lihat Semua Notifikasi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotifikasiDropdown;
