import { Navigate } from "react-router-dom";

const UserProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Agar login hi nahi hai
    return <Navigate to="/login" />;
  }

  if (user.role !== "user") {
    // Agar admin hai ya role match nahi karta
   
  }

  return children;
};

export default UserProtectedRoute;

