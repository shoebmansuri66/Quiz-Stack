import React, { useEffect } from 'react';
// 1. AOS Import karein
import AOS from "aos";
import "aos/dist/aos.css";

export default function About() {
  
  useEffect(() => {
    // 2. AOS Initialize
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        
        {/* Main Card with Zoom-in effect */}
        <div 
          className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
          data-aos="zoom-in"
        >
          
          {/* Header Section */}
          <div className="bg-blue-600 p-10 text-center text-white">
            <h1 className="text-4xl font-extrabold tracking-tight" data-aos="fade-down" data-aos-delay="200">
              About QuizPro
            </h1>
            <p className="mt-2 text-blue-100 text-lg" data-aos="fade-up" data-aos-delay="400">
              Empowering learners through interactive challenges.
            </p>
          </div>

          <div className="p-8 md:p-12">
            {/* Section 1: The Vision */}
            <div className="mb-12" data-aos="fade-right" data-aos-delay="500">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-600 pl-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                QuizPro is a full-stack web application designed to provide a seamless experience for both 
                students and administrators. Our goal is to create a platform where users can test their 
                technical knowledge in real-time, while providing admins with powerful tools to manage 
                content dynamically.
              </p>
            </div>

            {/* Section 2: Key Features with Delay */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div 
                className="bg-gray-50 p-6 rounded-xl border border-gray-100" 
                data-aos="fade-up" 
                data-aos-delay="600"
              >
                <h3 className="font-bold text-gray-800 mb-2">Real-time Management</h3>
                <p className="text-gray-600 text-sm">Instantly add, update, or delete quizzes via our dedicated Admin Dashboard.</p>
              </div>
              <div 
                className="bg-gray-50 p-6 rounded-xl border border-gray-100" 
                data-aos="fade-up" 
                data-aos-delay="700"
              >
                <h3 className="font-bold text-gray-800 mb-2">Secure Access</h3>
                <p className="text-gray-600 text-sm">Role-based authentication ensures that only authorized admins can modify quiz data.</p>
              </div>
            </div>

            {/* Section 3: Tech Stack */}
            <div className="mb-12 text-center" data-aos="fade-up" data-aos-delay="800">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Built With Modern Technologies</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {['React.js', 'Firebase Auth', 'Cloud Firestore', 'Tailwind CSS', 'React Router'].map((tech, index) => (
                  <span 
                    key={tech} 
                    className="bg-white border-2 border-gray-100 text-gray-700 px-5 py-2 rounded-xl text-sm font-bold shadow-sm"
                    data-aos="flip-left"
                    data-aos-delay={900 + (index * 100)}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Section 4: Developer Profile */}
            <div className="border-t border-gray-100 pt-10 flex flex-col items-center" data-aos="fade-up" data-aos-delay="1000">
              <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center text-white text-2xl font-black mb-4 shadow-lg">
                SM
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Shoeb Mansuri</h3>
              <p className="text-blue-600 font-medium">Lead Developer & Student</p>
              
              <div className="mt-6 flex items-center gap-6">
                <a href="https://github.com" className="text-gray-400 hover:text-gray-900 transition-colors">GitHub</a>
                <a href="https://linkedin.com" className="text-gray-400 hover:text-blue-600 transition-colors">LinkedIn</a>
                <a href="mailto:shoebmansuri66@gmail.com" className="text-gray-400 hover:text-red-500 transition-colors">Contact Me</a>
              </div>
            </div>

          </div>
        </div>

        <p className="text-center text-gray-400 mt-8 text-sm" data-aos="fade-in" data-aos-delay="1200">
          &copy; 2026 QuizPro. All rights reserved.
        </p>
      </div>
    </div>
  );
}