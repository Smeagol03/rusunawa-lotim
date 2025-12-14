import React from "react";
import { UserCircleIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useAuth } from "/src/context/AuthContext";
import NotifikasiDropdown from "./NotifikasiDropdown";

const Topbar = ({ onToggleSidebar }) => {
  const { currentUser } = useAuth();

  // Get display name or fallback to email
  const displayName =
    currentUser?.displayName || currentUser?.email?.split("@")[0] || "Admin";
  const email = currentUser?.email || "Administrator";

  return (
    <div className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
        <h2 className="text-sm md:text-lg font-semibold text-slate-800 truncate">
          PERKIM LOTIM
        </h2>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notification Dropdown */}
        <NotifikasiDropdown />

        <div className="flex items-center space-x-3 border-l border-slate-200 pl-4">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-slate-700">{displayName}</p>
            <p className="text-xs text-slate-500">{email}</p>
          </div>
          <UserCircleIcon className="w-10 h-10 text-slate-400" />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
