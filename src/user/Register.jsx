import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Firestore functions
import { auth, db } from "../firebase"; // Firebase setup imports
import { useNavigate, NavLink } from "react-router-dom";

// Redux Actions
import {
  registerStart,
  registerSuccess,
  registerFail
} from "../Redux/store";

const Register = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  
  
 // ✅ Sahi (Sirf loading aur error nikaalein)
const loading = useSelector((state) => state.loading);
const error = useSelector((state) => state.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (password !== confirmPassword) {
      return dispatch(registerFail("Passwords do not match!"));
    }

    dispatch(registerStart());

    try {
      // 1. Firebase Auth mein user account create karein
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      // 2. Firestore mein user ka role "user" save karein
      // Collection: 'users', Document ID: user.uid
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        role: "user", // Default role
        createdAt: new Date().toISOString()
      });

      const userData = {
        uid: user.uid,
        email: user.email,
        role: "user"
      };

      // 3. Redux update karein aur Home par bhejein
      dispatch(registerSuccess(userData));
      nav("/"); 

    } catch (err) {
      // Firebase specific errors ko handle karein
      dispatch(registerFail(err.message));
      console.error("Registration Error:", err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6 border border-gray-700"
      >
        <h2 className="text-3xl font-bold text-center text-white">
          Create Account
        </h2>

        {/* Error Message Display */}
        {error && (
          <p className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-sm text-center">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-gray-300 text-sm block mb-1">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm block mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm block mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-400 hover:underline">
            Login here
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Register;