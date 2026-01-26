import { signOut } from "firebase/auth";
import { auth } from "/src/config/firebase";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  NewspaperIcon,
  TrashIcon,
  BuildingOffice2Icon,
  ArrowLeftOnRectangleIcon,
  XMarkIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

const Sidebar = ({ onClose }) => {
  const menuItems = [
    { name: "Dashboard", icon: HomeIcon, path: "/admin" },
    { name: "Kelola Penghuni", icon: UsersIcon, path: "/admin/penghuni" },
    { name: "Kelola Pendaftar", icon: NewspaperIcon, path: "/admin/pendaftar" },
    { name: "Kelola Unit", icon: BuildingOffice2Icon, path: "/admin/unit" },
    { name: "Keranjang Sampah", icon: TrashIcon, path: "/admin/sampah" },
    { name: "Log Aktivitas", icon: BellIcon, path: "/admin/notifikasi" },
  ];

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      // Logout error handled silently
    }
  };

  return (
    <div className="bg-slate-900 text-white w-64 h-full flex flex-col transition-all duration-300">
      <div className="p-6 border-b border-slate-800 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-500">AdminPanel</h1>
        <button
          onClick={onClose}
          className="lg:hidden text-slate-400 hover:text-white"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                onClick={onClose} // Auto close on navigation on mobile
                className="flex items-center space-x-3 text-slate-300 p-3 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
              >
                <item.icon className="w-6 h-6" />
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center space-x-3 text-slate-400 p-3 w-full rounded-lg hover:bg-red-900/20 hover:text-red-500 transition-colors"
        >
          <ArrowLeftOnRectangleIcon className="w-6 h-6" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
