const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-600">TaskManager</h1>
        
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h2 className="text-5xl font-bold text-gray-800 mb-6">
          Organize Your Tasks <br /> Stay Productive 🚀
        </h2>
        <p className="text-gray-600 max-w-xl mb-8">
          Manage your daily tasks efficiently with our powerful and simple
          task management system.
        </p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-xl text-lg hover:bg-blue-700 transition">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 px-10 pb-20">
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-3 text-blue-600">
            Easy to Use
          </h3>
          <p className="text-gray-600">
            Simple and clean interface to manage tasks without confusion.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-3 text-blue-600">
            Secure
          </h3>
          <p className="text-gray-600">
            Firebase authentication keeps your data safe and secure.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-3 text-blue-600">
            Fast Performance
          </h3>
          <p className="text-gray-600">
            Built with React and Vite for lightning fast experience.
          </p>
        </div>
      </section>

    </div>
  );
};

export default Home;
