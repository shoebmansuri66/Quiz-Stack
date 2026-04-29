
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedUserRoute({ children }) {
  // LocalStorage se user uthayenge kyunki refresh par Redux khaali ho jata hai
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Agar login nahi hai, toh login page par bhej do
    return <Navigate to="/login" replace />;
  }

  return children;
}