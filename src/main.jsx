import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Daftar from "./pages/Daftar";
import Login from "./pages/Login";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import KelolaPenghuni from "./pages/admin/KelolaPenghuni";
import KelolaPendaftar from "./pages/admin/KelolaPendaftar";
import KelolaUnit from "./pages/admin/KelolaUnit";
import KeranjangSampah from "./pages/admin/KeranjangSampah";
import Notifikasi from "./pages/admin/Notifikasi";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/daftar" element={<Daftar />} />
          <Route path="/login" element={<Login />} />
          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="penghuni" element={<KelolaPenghuni />} />
            <Route path="pendaftar" element={<KelolaPendaftar />} />
            <Route path="sampah" element={<KeranjangSampah />} />
            <Route path="unit" element={<KelolaUnit />} />
            <Route path="notifikasi" element={<Notifikasi />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
