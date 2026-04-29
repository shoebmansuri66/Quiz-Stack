import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, roleRequired }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // 1. Agar user login nahi hai
  if (!user) {
    return <Navigate to="/login" />;
  }

  // 2. Agar role match nahi karta (Admin page par User aa jaye)
  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/" />;
  }

  return children;
};
