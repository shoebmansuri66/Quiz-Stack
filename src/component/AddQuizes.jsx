import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase"; // path check kar lena

export default function AddQuizAdmin() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!question || options.some(opt => opt === "") || !answer) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "quizzes"), {
        question,
        options,
        correctAnswer: answer,
        createdAt: serverTimestamp(),
        createdBy: "admin",
      });

      alert("Quiz added successfully ✅");

      // reset
      setQuestion("");
      setOptions(["", "", "", ""]);
      setAnswer("");
    } catch (err) {
      console.error(err);
      alert("Error adding quiz ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-gray-900 text-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Admin Panel – Add Quiz
      </h2>

      <form onSubmit={submitHandler} className="space-y-4">
        <input
          type="text"
          placeholder="Enter Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-3 rounded bg-gray-700"
        />

        {options.map((opt, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(i, e.target.value)}
            className="w-full p-3 rounded bg-gray-700"
          />
        ))}

        <input
          type="text"
          placeholder="Correct Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full p-3 rounded bg-green-700"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-semibold"
        >
          {loading ? "Saving..." : "Add Quiz"}
        </button>
      </form>
    </div>
  );
}
