import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebase"; 
import { doc, getDoc } from "firebase/firestore"; 
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Redux/store"; 
import { toast } from "react-toastify";

export default function AdminLogin() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      const userDoc = await getDoc(doc(db, "users", uid));

      if (userDoc.exists()) {
        const userDataFromDB = userDoc.data();
        
        // Console check karein ki yahan 'admin' hi aa raha hai na?
        console.log("DB Role:", userDataFromDB.role);

        if (userDataFromDB.role === "admin") {
          // ✅ Success Data Object
          const finalUser = {
            uid: uid,
            email: userCred.user.email,
            role: "admin",
            ...userDataFromDB // Baki fields bhi aa jayengi
          };

          // 1. Redux Update
          dispatch(loginSuccess(finalUser));

          // 2. LocalStorage Update (IMPORTANT: Ise 'user' key mein rakhein)
          localStorage.setItem("user", JSON.stringify(finalUser));

          toast.success("Welcome Boss! Admin Access Granted.");
          nav("/admin"); 
        } else {
          setError("Access Denied: You are not authorized as an Admin.");
          toast.error("You are not an Admin!");
          await signOut(auth); 
        }
      } else {
        setError("User data not found in Firestore.");
        await signOut(auth);
      }
    } catch (err) {
      console.error("Auth Error:", err.code);
      setError("Login Failed: Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <form
        onSubmit={submitHandler}
        className="bg-gray-900 p-10 rounded-[2.5rem] w-full max-w-md shadow-2xl border border-gray-800"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl text-white font-black tracking-tight">Admin <span className="text-blue-500">Portal</span></h2>
          <p className="text-gray-500 mt-2 text-sm font-medium">Authorized Personnel Only</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-2xl mb-6 text-sm text-center font-bold">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <input
            type="email"
            placeholder="Admin Email"
            className="w-full p-4 rounded-2xl bg-gray-800 text-white border-2 border-transparent focus:border-blue-500 outline-none transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Secret Password"
            className="w-full p-4 rounded-2xl bg-gray-800 text-white border-2 border-transparent focus:border-blue-500 outline-none transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl text-white font-black text-lg shadow-lg shadow-blue-900/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Login to Dashboard"}
          </button>
        </div>

        <div className="mt-8 text-center">
          <NavLink to="/login" className="text-gray-500 text-sm hover:text-blue-400 font-bold transition-colors">
            ← Exit to User Login
          </NavLink>
        </div>
      </form>
    </div>
  );
}

