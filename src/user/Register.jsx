import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase"; // Path check kar lena
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Firebase Auth se user create karein
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Firestore mein user ka role set karein (By default "user")
      const userData = {
        uid: user.uid,
        email: user.email,
        role: "user", // 👈 Ye sabse important hai ProtectedRoute ke liye
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "users", user.uid), userData);

      // 3. LocalStorage mein save karein taaki ProtectedRoute turant access de de
      localStorage.setItem("user", JSON.stringify(userData));

      toast.success("Account Created Successfully! 🎉");
      nav("/"); // Home par bhej do
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 py-12">
      <div 
        data-aos="zoom-in" 
        className="max-w-md w-full bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-700"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white">Join <span className="text-blue-500">QuizPro</span></h2>
          <p className="text-slate-400 mt-2">Create your account to start playing</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="text-sm font-semibold text-slate-300 ml-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-4 bg-slate-700 text-white border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-300 ml-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-4 bg-slate-700 text-white border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-slate-400 mt-8 text-sm">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-500 font-bold hover:underline">Log in</NavLink>
        </p>
      </div>
    </div>
  );
}