// import { Routes, Route, useLocation } from "react-router-dom";
// import React from "react";   // 👈 YE LINE MUST HAI
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import "./App.css";
import Home from "./user/Home.jsx";
import About from "./user/About.jsx";
import Register from "./user/Register.jsx";
import Login from "./user/Login.jsx";
import Quizes from "./user/Quizess.jsx";
import Leaderboard from "./user/Leaderboards.jsx";
import Navbar from "./user/Navbars.jsx";
import Error from "./user/Error.jsx";

import Dashboard from "./component/Dashboard.jsx";
import AddQuizes from "./component/AddQuizes.jsx";
import AdminLogin from "./component/AdminLogin.jsx";

import ProtectedUserRoute from "./component/ProtectedRoute.jsx";
import ProtectedAdminRoute from "./component/ProtectedRoute.jsx";
import { ToastContainer, Bounce } from "react-toastify";

export default function App() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/admin");

  return (
    <>


      <ToastContainer position="bottom-right" autoClose={5000} theme="dark" transition={Bounce} />

      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* User Only Routes */}
        <Route path="/quizes" element={<ProtectedUserRoute><Quizes /></ProtectedUserRoute>} />
        <Route path="/leaderboard" element={<ProtectedUserRoute><Leaderboard /></ProtectedUserRoute>} />

        {/* Admin Only Routes */}
        <Route path="/admin" element={
          <ProtectedAdminRoute>
            <Dashboard />
          </ProtectedAdminRoute>
        }>
          <Route path="addquizes" element={<AddQuizes />} />
          <Route path="all-quizes" element={<Quizes />} /> {/* Admin can also see all quizes */}
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}
