import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "/src/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
