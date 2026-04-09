import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth"; // signOut add kiya
import { auth, db } from "../firebase"; 
import { doc, getDoc } from "firebase/firestore"; 
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux"; // Redux dispatch add kiya
import { loginSuccess, loginFail } from "../Redux/store"; // Apne store ke hisab se import karein

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
      // 1. Firebase Auth se login
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      // 2. Firestore se role check karein
      const userDoc = await getDoc(doc(db, "users", uid));

      if (userDoc.exists()) {
        const userDataFromDB = userDoc.data();
        
        // Debugging ke liye console (Ise baad mein hata dena)
        console.log("Database Role:", userDataFromDB.role);

        if (userDataFromDB.role === "admin") {
          // ✅ SUCCESS: Agar Admin hai
          const finalUser = {
            uid: uid,
            email: userCred.user.email,
            role: "admin"
          };

          // Redux aur LocalStorage dono update karein
          dispatch(loginSuccess(finalUser));
          localStorage.setItem("loggedin", "true");
          localStorage.setItem("role", "admin");
          localStorage.setItem("uid", uid);

          nav("/admin"); 
        } else {
          // ❌ FAIL: Login sahi hai par role admin nahi hai
          setError("Access Denied: You are not authorized as an Admin.");
          await signOut(auth); // User ko sign out kar dein taaki session clear rahe
        }
      } else {
        setError("User data not found in Firestore. Please register first.");
        await signOut(auth);
      }

    } catch (err) {
      // 3. 👈 ACTUAL ERROR CHECK
      // Agar password galat hoga toh Firebase 'auth/wrong-password' dega
      console.error("Auth Error:", err.code);
      
      if (err.code === "auth/wrong-password") {
        setError("Password galat hai!");
      } else if (err.code === "auth/user-not-found") {
        setError("Ye email registered nahi hai.");
      } else {
        setError("Login Failed: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <form
        onSubmit={submitHandler}
        className="bg-gray-800 p-8 rounded-2xl w-full max-w-md shadow-2xl border border-gray-700"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl text-white font-bold mb-2">Admin Portal</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-3 text-sm">Authorized Access Only</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-6 text-sm text-center animate-pulse">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="text-gray-400 text-xs font-semibold uppercase ml-1">Admin Email</label>
            <input
              type="email"
              placeholder="admin@example.com"
              className="w-full p-3 mt-1 rounded-lg bg-gray-900/50 text-white border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-gray-400 text-xs font-semibold uppercase ml-1">Secret Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 mt-1 rounded-lg bg-gray-900/50 text-white border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg text-white font-bold shadow-lg shadow-blue-900/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Verifying Credentials..." : "Access Dashboard"}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
          <NavLink to="/login" className="text-gray-500 text-sm hover:text-blue-400 transition-colors">
            ← Back to User Login
          </NavLink>
        </div>
      </form>
    </div>
  );
}