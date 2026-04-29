import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Firebase Auth se login karein
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Firestore se user ka Role fetch karein
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();

        // 3. LocalStorage mein poora data save karein (Role ke saath)
        localStorage.setItem("user", JSON.stringify(userData));

        toast.success(`Welcome back! 👋`);

        // 4. Role ke hisaab se redirect karein
        if (userData.role === "admin") {
          nav("/admin");
        } else {
          nav("/");
        }
      } else {
        toast.error("User data not found in database!");
      }
    } catch (error) {
      toast.error("Invalid Email or Password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div 
        data-aos="fade-up" 
        className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100"
      >
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-gray-900">Welcome <span className="text-blue-600">Back</span></h2>
          <p className="text-gray-500 mt-3 font-medium">Please enter your details to login</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-700"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-700"
              placeholder="••••••••"
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-blue-600 shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95 disabled:opacity-50 mt-4"
          >
            {loading ? "Verifying..." : "Sign In"}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-500 text-sm font-medium">
            New here?{" "}
            <NavLink to="/register" className="text-blue-600 font-bold hover:underline underline-offset-4">Create Account</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}