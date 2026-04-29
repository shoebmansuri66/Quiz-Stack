import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css"

// User Pages
import Home from "./user/Home.jsx";
import About from "./user/About.jsx";
import Register from "./user/Register.jsx";
import Login from "./user/Login.jsx";
import Quizes from "./user/Quizess.jsx";
import Leaderboard from "./user/Leaderboards.jsx";
import Navbar from "./user/Navbars.jsx";
import Error from "./user/Error.jsx";

// Admin & Auth Components
import Dashboard from "./component/Dashboard.jsx";
import AddQuizes from "./component/AddQuizes.jsx";
import AdminLogin from "./component/AdminLogin.jsx";
import ProtectedUserRoute from "./user/ProtectedRoute.jsx"; // File name change kariye
import ProtectedAdminRoute from "./component/ProtectedAdminRoute.jsx"; // File name change kariye

export default function App() {
  const location = useLocation();
  
  // Clean logic to hide Navbar
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      <ToastContainer 
        position="bottom-right" 
        autoClose={3000} 
        theme="dark" 
        transition={Bounce} 
      />

      {/* Navbar sirf User pages par dikhega */}
      {!isAdminPath && <Navbar />}

      <Routes>
        {/* === PUBLIC ROUTES === */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* === USER PROTECTED ROUTES === */}
        <Route path="/quizes" element={
          <ProtectedUserRoute>
            <Quizes />
          </ProtectedUserRoute>
        } />
        <Route path="/leaderboard" element={
          <ProtectedUserRoute>
            <Leaderboard />
          </ProtectedUserRoute>
        } />

        {/* === ADMIN PROTECTED ROUTES (NESTED) === */}
        <Route path="/admin" element={
          <ProtectedAdminRoute>
            <Dashboard />
          </ProtectedAdminRoute>
        }>
          {/* Dashboard ke andar ke components yahan aayenge */}
          <Route path="addquizes" element={<AddQuizes />} />
          <Route path="all-quizes" element={<Quizes />} />
        </Route>

        {/* === 404 ERROR === */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}