import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "/src/context/AuthContext";

// Admin UID dari environment variable
const ADMIN_UID = import.meta.env.VITE_ADMIN_UID;

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // Cek apakah user sudah login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Cek apakah user adalah admin
  if (ADMIN_UID && currentUser.uid !== ADMIN_UID) {
    // Bukan admin, redirect ke home dengan pesan
    alert("Akses ditolak. Anda bukan administrator.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
