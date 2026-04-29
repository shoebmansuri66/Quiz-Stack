import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc, increment } from "firebase/firestore";
// 1. AOS Imports
import AOS from "aos";
import "aos/dist/aos.css";

export default function Quizes() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {
    // 2. AOS Initialize
    AOS.init({ duration: 800, once: true });

    const getData = async () => {
      const snapshot = await getDocs(collection(db, "quizzes"));
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuizzes(list);
    };
    getData();
  }, []);

  const categories = ["All", ...new Set(quizzes.map(q => q.category))];

  const filteredData = selectedCategory === "All" 
    ? quizzes 
    : quizzes.filter(q => q.category === selectedCategory);

  // 3. Database Update Logic inside handleCheck
  const handleCheck = async (id, option, correctAnswer) => {
    // UI Update
    setUserAnswers({ ...userAnswers, [id]: option });

    // Database Update
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (!currentUser || !currentUser.uid) return;

    const userRef = doc(db, "users", currentUser.uid);

    try {
      if (option === correctAnswer) {
        // Right Answer: increment score and correct count
        await updateDoc(userRef, {
          score: increment(10),
          correct: increment(1),
          totalPlayed: increment(1)
        });
      } else {
        // Wrong Answer: increment wrong count
        await updateDoc(userRef, {
          wrong: increment(1),
          totalPlayed: increment(1)
        });
      }
    } catch (error) {
      console.error("Error updating stats:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
      <div className="flex justify-between items-center mb-6 max-w-4xl mx-auto" data-aos="fade-down">
        <h1 className="text-2xl font-black text-gray-700 tracking-tight">
          QUIZ<span className="text-blue-600">PRO</span>
        </h1>
        
        <select 
          className="p-2 border rounded-xl shadow-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {filteredData.map((item, index) => {
          const selected = userAnswers[item.id];

          return (
            <div 
              key={item.id} 
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
              data-aos="fade-up" // 4. Card Animation
              data-aos-delay={index * 50} // Har card thoda ruk kar aayega
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full uppercase tracking-wider">
                  {item.category}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-800 mb-6 leading-relaxed">
                {item.question}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {item.options.map((opt, i) => {
                  let btnClass = "p-4 text-left border-2 rounded-xl transition-all duration-200 font-medium ";
                  
                  if (selected) {
                    if (opt === item.correctAnswer) {
                      btnClass += "bg-green-50 border-green-500 text-green-700 shadow-sm shadow-green-100";
                    } else if (opt === selected) {
                      btnClass += "bg-red-50 border-red-500 text-red-700 shadow-sm shadow-red-100";
                    } else {
                      btnClass += "bg-gray-50 border-gray-100 opacity-50";
                    }
                  } else {
                    btnClass += "hover:border-blue-500 hover:bg-blue-50 border-gray-100";
                  }

                  return (
                    <button 
                      key={i} 
                      disabled={!!selected}
                      onClick={() => handleCheck(item.id, opt, item.correctAnswer)}
                      className={btnClass}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              
              {selected && (
                <div 
                  className={`mt-6 p-4 rounded-xl text-sm font-bold flex items-center gap-3 ${selected === item.correctAnswer ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  data-aos="zoom-in"
                >
                  <span>{selected === item.correctAnswer ? "🎯 Perfect! +10 Points" : `❌ Wrong Answer! (Correct: ${item.correctAnswer})`}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}