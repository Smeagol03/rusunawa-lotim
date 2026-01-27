import Navbar from "/src/komponen-home/Navbar";
import Footer from "/src/komponen-home/Footer";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "/src/config/firebase";
import {
  LockClosedIcon,
  EnvelopeIcon,
  ExclamationCircleIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err) {
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        setError("Email atau password yang Anda masukkan salah.");
      } else if (err.code === "auth/too-many-requests") {
        setError(
          "Terlalu banyak percobaan gagal. Silakan coba beberapa saat lagi.",
        );
      } else {
        setError("Gagal masuk. Periksa koneksi internet Anda.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Main Content Area */}
      <div className="flex-1 relative flex items-center justify-center py-28 md:py-32 px-6 overflow-hidden">
        <div className="w-full max-w-lg md:max-w-xl animate-fadeIn">
          {/* Header Branding */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Login <span className="text-emerald-600">Administrator</span>
            </h1>
            <p className="text-slate-500 font-medium text-lg">
              Akses panel manajemen sistem Rusunawa Lotim.
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-emerald-900/5 p-8 md:p-12">
            {error && (
              <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 mb-8 animate-shake">
                <ExclamationCircleIcon className="w-6 h-6 text-red-500 shrink-0" />
                <p className="text-red-700 text-sm font-bold">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 focus:bg-white transition-all outline-none"
                    placeholder="Masukkan email resmi"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <label className="text-sm font-black text-slate-700">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    Lupa Password?
                  </a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 focus:bg-white transition-all outline-none"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex items-center justify-center py-4 bg-slate-900 text-white font-black rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-200 active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
              >
                <div className="absolute inset-0 w-1 bg-emerald-600 transition-all duration-400 ease-out group-hover:w-full"></div>
                <span className="relative flex items-center gap-3">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Menautkan...
                    </>
                  ) : (
                    <>
                      Masuk ke Dashboard
                      <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm font-medium text-slate-400">
                Masalah akses?{" "}
                <a
                  href="#"
                  className="font-bold text-slate-600 hover:text-emerald-600 transition-colors underline"
                >
                  Hubungi IT Support
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginAdmin;
