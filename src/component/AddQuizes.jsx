import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function AddQuizes() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [category, setCategory] = useState(""); // Naya field
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "quizzes"), {
        question,
        options,
        correctAnswer,
        category: category.trim() || "General", // Default 'General'
        createdAt: new Date()
      });
      toast.success("Quiz added!");
      setQuestion(""); setOptions(["", "", "", ""]); setCorrectAnswer(""); setCategory("");
    } catch (err) { toast.error("Error!"); }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-black p-6 rounded-lg shadow-md border">
      <h2 className="text-2xl font-bold mb-4">Add New Quiz</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" placeholder="Category (e.g. React, JS)" 
          value={category} onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea 
          placeholder="Question" value={question} 
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {options.map((opt, i) => (
          <input 
            key={i} type="text" placeholder={`Option ${i+1}`}
            value={opt} onChange={(e) => {
              let newOpt = [...options]; newOpt[i] = e.target.value; setOptions(newOpt);
            }}
            className="w-full p-2 border rounded"
          />
        ))}
        <select 
          value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)}
          className="w-full p-2 border rounded bg-gray-50"
        >
          <option value="">Select Correct Answer</option>
          {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
        </select>
        <button className="w-full bg-blue-600 text-white p-2 rounded font-bold">
          {loading ? "Saving..." : "Save Question"}
        </button>
      </form>
    </div>
  );
}