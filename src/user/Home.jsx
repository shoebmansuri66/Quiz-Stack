import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// 1. AOS Import
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    // 2. AOS Initialize
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-20 py-5 bg-white border-b border-gray-100 sticky top-0 z-50">
        <h1 className="text-2xl font-black text-blue-600 tracking-tighter" data-aos="fade-right">
          Quiz<span className="text-gray-900">Pro</span>
        </h1>
        
        <Link 
          to="/login" 
          className="bg-gray-900 text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 transition"
          data-aos="fade-left"
        >
          Login
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-b from-blue-50 to-white">
        {/* Badge Animation */}
        <div 
          className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wide text-blue-600 uppercase bg-blue-100 rounded-full"
          data-aos="zoom-in"
        >
          Level Up Your Skills ⚡
        </div>

        {/* Title Animation */}
        <h2 
          className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Master Coding with <br /> 
          <span className="text-blue-600">Interactive Quizzes</span>
        </h2>

        {/* Paragraph Animation */}
        <p 
          className="text-gray-500 max-w-2xl text-lg md:text-xl mb-10 leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          Test your knowledge in React, JavaScript, and more. Challenge yourself 
          with real-time questions and track your progress instantly.
        </p>
        
        {/* Button Animation */}
        <div data-aos="fade-up" data-aos-delay="600">
          <Link 
            to="/quizes" 
            className="bg-blue-600 text-white px-10 py-4 rounded-2xl text-lg font-bold hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all active:scale-95 inline-block"
          >
            Start Quiz Now →
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6 pb-24">
        {/* Feature 1 */}
        <div 
          className="group p-8 rounded-3xl border border-gray-100 bg-white hover:border-blue-500 transition-all shadow-sm hover:shadow-md"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            🎯
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-900">Topic Wise</h3>
          <p className="text-gray-500 leading-relaxed">
            Quizzes categorized by technology. Choose what you want to learn today.
          </p>
        </div>

        {/* Feature 2 */}
        <div 
          className="group p-8 rounded-3xl border border-gray-100 bg-white hover:border-blue-500 transition-all shadow-sm hover:shadow-md"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            🛡️
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-900">Verified Content</h3>
          <p className="text-gray-500 leading-relaxed">
            All questions are managed by experts through our secure admin dashboard.
          </p>
        </div>

        {/* Feature 3 */}
        <div 
          className="group p-8 rounded-3xl border border-gray-100 bg-white hover:border-blue-500 transition-all shadow-sm hover:shadow-md"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            🚀
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-900">Fast Result</h3>
          <p className="text-gray-500 leading-relaxed">
            Get instant feedback on your answers and learn from your mistakes.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 border-t border-gray-50 text-gray-400 text-sm" data-aos="fade-in">
        Built with React & Firebase by Shoeb Mansuri
      </footer>
    </div>
  );
};

export default Home;