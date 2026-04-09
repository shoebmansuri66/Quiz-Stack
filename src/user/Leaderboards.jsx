import React from "react";

export default function Leaderboard() {
  const data = [
    {
      title: "Pending",
      count: 8,
      color: "bg-yellow-100 text-yellow-700",
      border: "border-yellow-400",
    },
    {
      title: "In Process",
      count: 5,
      color: "bg-blue-100 text-blue-700",
      border: "border-blue-400",
    },
    {
      title: "Completed",
      count: 12,
      color: "bg-green-100 text-green-700",
      border: "border-green-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-10">
        Leaderboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className={`border ${item.border} rounded-xl shadow-md p-6 ${item.color} hover:scale-105 transition-transform`}
          >
            <h2 className="text-xl font-semibold mb-2">
              {item.title}
            </h2>

            <p className="text-4xl font-bold">
              {item.count}
            </p>

            <p className="mt-2 text-sm opacity-80">
              Total quizzes
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
