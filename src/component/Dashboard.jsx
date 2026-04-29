import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Dashboard() {
  const nav = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    toast.info("Logged out from Admin Panel");
    nav("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${
      isActive 
        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" 
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* SIDEBAR - Responsive */}
      <aside className="hidden md:flex w-72 bg-slate-900 flex-col fixed h-full border-r border-slate-800 shadow-2xl z-50">
        <div className="p-8">
          <h2 className="text-2xl font-black tracking-tighter text-white">
            ADMIN<span className="text-blue-500 font-light">HUB</span>
          </h2>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavLink to="/admin" end className={navLinkClass}>
            <span>📊</span> Dashboard Home
          </NavLink>
          <NavLink to="/admin/addquizes" className={navLinkClass}>
            <span>➕</span> Add New Quiz
          </NavLink>
          <NavLink to="/admin/all-quizes" className={navLinkClass}>
            <span>📝</span> View All Quizzes
          </NavLink>
        </nav>

        <div className="p-6 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-500 py-4 rounded-2xl hover:bg-red-500 hover:text-white transition-all font-bold"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 md:ml-72 p-6 md:p-12 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center mb-8 bg-slate-900 p-5 rounded-3xl border border-slate-800">
           <h2 className="font-black text-blue-500">ADMIN</h2>
           <button onClick={handleLogout} className="text-red-500 text-sm font-bold">Logout</button>
        </div>

        <div data-aos="fade-up">
           <Outlet /> {/* Yahan aapke nested components (AddQuizes, etc.) dikhenge */}
        </div>
      </main>
    </div>
  );
}