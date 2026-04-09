import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const { user } = useSelector(state => state);
  
  // Check if user is logged in AND is an admin
  if (!user) return <Navigate to="/admin-login" />;
  if (user.role !== "admin") return <Navigate to="/" />; // Redirect non-admins to home

  return children;
}
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// export default function ProtectedUserRoute({ children }) {
//   const { user } = useSelector(state => state);

//   if (!user) return <Navigate to="/login" />;

//   return children;
// }