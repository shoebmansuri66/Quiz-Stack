import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const nav = useNavigate();

  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-blue-600 text-white px-3 py-2 rounded"
      : "text-gray-200 hover:bg-blue-500 hover:text-white px-3 py-2 rounded";

  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-gray-900 text-white w-60 p-4 flex flex-col gap-3">
        <NavLink to="/admin" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="users" className={linkClass}>
          Users
        </NavLink>

        <NavLink to="add-quizes" className={linkClass}>
          Add Quizes
        </NavLink>

        <NavLink to="management" className={linkClass}>
          Management
        </NavLink>

        <button
          onClick={() => nav("/")}
          className="mt-4 bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded"
        >
          Go Back
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("adminToken");
            nav("/admin-login");
          }}
          className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto bg-white">
        <Outlet />
      </main>
    </div>
  );
}
