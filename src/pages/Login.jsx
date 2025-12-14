import Navbar from "/src/komponen-home/Navbar";
import Footer from "/src/komponen-home/Footer";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "/src/config/firebase";

const LoginAdmin = () => {
  // State placeholder for future implementation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // AuthContext will detect change and we can redirect
      navigate("/admin");
    } catch (err) {
      console.error("Login error:", err);
      // Custom error messages
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        setError("Email atau password salah.");
      } else if (err.code === "auth/too-many-requests") {
        setError(
          "Terlalu banyak percobaan login gagal. Silakan coba lagi nanti."
        );
      } else {
        setError("Gagal login. Periksa koneksi atau hubungi admin.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="py-10 flex items-center justify-center bg-gray-100 p-4 font-sans">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Login Administrator
            </h3>
            <p className="text-gray-500 text-sm">
              Masuk untuk mengelola dashboard dan data.
            </p>
          </div>

          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-medium py-2 rounded-md transition ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Butuh bantuan akses?{" "}
              <a
                href="#"
                className="font-medium text-indigo-600 hover:underline"
              >
                Hubungi IT Support
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginAdmin;
