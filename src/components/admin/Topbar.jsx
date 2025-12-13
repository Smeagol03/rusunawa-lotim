import React from "react";
import {
  BellIcon,
  UserCircleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

const Topbar = ({ onToggleSidebar }) => {
  return (
    <div className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold text-slate-800 truncate">
          Dashboard Overview
        </h2>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 text-slate-500 hover:text-blue-600 transition-colors relative">
          <BellIcon className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center space-x-3 border-l border-slate-200 pl-4">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-slate-700">Admin User</p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>
          <UserCircleIcon className="w-10 h-10 text-slate-400" />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
