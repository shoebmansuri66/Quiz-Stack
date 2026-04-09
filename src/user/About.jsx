import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-6">
      
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Side - Image */}
        <div className="flex justify-center">
          <img
            src="https://via.placeholder.com/350"
            alt="profile"
            className="rounded-2xl shadow-2xl w-80 h-80 object-cover"
          />
        </div>

        {/* Right Side - Content */}
        <div>
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            Hi, I'm Z — a passionate MERN Stack Developer.
            I build responsive, scalable, and modern web applications.
            I love solving real-world problems using clean UI and efficient code.
          </p>

          {/* Skills */}
          <div className="space-y-3">
            <div>
              <p className="text-sm mb-1">Frontend (React, Tailwind)</p>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full w-[85%]"></div>
              </div>
            </div>

            <div>
              <p className="text-sm mb-1">Backend (Node, Express)</p>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full w-[75%]"></div>
              </div>
            </div>

            <div>
              <p className="text-sm mb-1">Database (MongoDB)</p>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full w-[70%]"></div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-8">
            <div>
              <h2 className="text-2xl font-bold">10+</h2>
              <p className="text-gray-400 text-sm">Projects</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold">1+</h2>
              <p className="text-gray-400 text-sm">Year Learning</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold">100%</h2>
              <p className="text-gray-400 text-sm">Dedication</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default About;
