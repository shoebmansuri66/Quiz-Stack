import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // Check 1: Kya user logged in hai?
  // Check 2: Kya uska role admin hai?
  if (!user || user.role !== "admin") {
    // Agar admin nahi hai, toh use access mat do
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}