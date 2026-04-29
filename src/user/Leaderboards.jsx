import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, getDocs, doc, getDoc } from "firebase/firestore";
// 1. AOS Import karein
import AOS from "aos";
import "aos/dist/aos.css";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [userStats, setUserStats] = useState({ total: 0, right: 0, wrong: 0 });

  useEffect(() => {
    // 2. AOS Initialize karein
    AOS.init({
      duration: 1000, // animation ki speed
      once: true,     // sirf ek baar animate hoga scroll karne par
    });

    const fetchData = async () => {
      // Global Rankings Fetch
      const q = query(collection(db, "users"), orderBy("score", "desc"));
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLeaders(list);

      // User Stats Fetch (Direct from DB for fresh data)
      const currentUser = JSON.parse(localStorage.getItem("user"));
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserStats({
            total: data.totalPlayed || 0,
            right: data.correct || 0,
            wrong: data.wrong || 0
          });
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 text-gray-800">
      <div className="max-w-5xl mx-auto">
        
        {/* Section 1: Personal Stats with AOS */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2" data-aos="fade-right">
            📊 Your <span className="text-blue-600">Performance</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div 
              className="bg-white p-6 rounded-2xl border-b-4 border-blue-500 shadow-sm" 
              data-aos="fade-up" 
              data-aos-delay="100"
            >
              <p className="text-gray-500 text-sm font-semibold uppercase">Quizzes Played</p>
              <h3 className="text-3xl font-black text-gray-800">{userStats.total}</h3>
            </div>
            {/* Card 2 */}
            <div 
              className="bg-white p-6 rounded-2xl border-b-4 border-green-500 shadow-sm" 
              data-aos="fade-up" 
              data-aos-delay="200"
            >
              <p className="text-gray-500 text-sm font-semibold uppercase">Correct Answers</p>
              <h3 className="text-3xl font-black text-green-600">{userStats.right}</h3>
            </div>
            {/* Card 3 */}
            <div 
              className="bg-white p-6 rounded-2xl border-b-4 border-red-500 shadow-sm" 
              data-aos="fade-up" 
              data-aos-delay="300"
            >
              <p className="text-gray-500 text-sm font-semibold uppercase">Wrong Answers</p>
              <h3 className="text-3xl font-black text-red-500">{userStats.wrong}</h3>
            </div>
          </div>
        </div>

        {/* Section 2: Global Rankings with AOS */}
        <div 
          className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden" 
          data-aos="zoom-in" 
          data-aos-delay="400"
        >
          <div className="p-6 bg-gray-900 text-white">
            <h2 className="text-xl font-bold">Global Rankings</h2>
            <p className="text-gray-400 text-sm">Compete with users worldwide</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-widest">
                  <th className="px-6 py-4">Rank</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Score</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leaders.map((user, index) => (
                  <tr 
                    key={user.id} 
                    className="hover:bg-blue-50/50 transition-colors"
                    data-aos="fade-up"
                    data-aos-anchor-placement="top-bottom"
                  >
                    <td className="px-6 py-4 font-bold text-gray-400">
                      {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-800">{user.email?.split('@')[0]}</div>
                      <div className="text-xs text-gray-400">Active Member</div>
                    </td>
                    <td className="px-6 py-4 font-black text-blue-600">{user.score || 0} pts</td>
                    <td className="px-6 py-4 text-center">
                       <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded">COMPLETED</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}