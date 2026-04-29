import { NavLink, useNavigate } from "react-router-dom";

export default function Navbars() {
  const loggedinUser = localStorage.getItem("userloggedIn");
  const nav = useNavigate();

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-400 font-semibold"
      : "text-gray-200 hover:text-white";

  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Left links */}
      <div className="flex gap-6">
        <NavLink to="/" className={linkClass}>  Home </NavLink>
        <NavLink to="/about" className={linkClass}>  About </NavLink>
        <NavLink to="/quizes" className={linkClass}> Quizes </NavLink>
         <NavLink to="/leaderboard" className={linkClass}> Leaderboard </NavLink>
         
      </div>

      {/* Right auth */}
      <div>
        {loggedinUser ? (
          <button
            onClick={() => {
              localStorage.removeItem("userloggedIn");
              nav("/login");
            }}
            className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded"
          >
            Login / Signup
          </NavLink>
        )}
      </div>
    </nav>
  );
}

 