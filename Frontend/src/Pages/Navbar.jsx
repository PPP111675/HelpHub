import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="https://tse3.mm.bing.net/th?id=OIP.G5Z5KqW9wN-2hH9EqFhiDQAAAA&pid=Api&P=0&h=180" alt="Logo" className="h-11 w-15 rounded-full" />
          <span className="text-blue-800 font-bold text-xl">HelpHub</span>
        </div>

        <div className="hidden md:flex space-x-6 text-blue-800 font-medium">
  <Link
    to="/"
    className="pb-1 border-b-2 border-transparent hover:border-blue-600 hover:text-blue-600 transition duration-300"
  >
    Home
  </Link>
  <Link
    to="/About"
    className="pb-1 border-b-2 border-transparent hover:border-blue-600 hover:text-blue-600 transition duration-300"
  >
    About
  </Link>
  <Link
    to="/contact"
    className="pb-1 border-b-2 border-transparent hover:border-blue-600 hover:text-blue-600 transition duration-300"
  >
    Contact
  </Link>
</div>
        <div className="flex space-x-3">
          <Link
            to="/login"
            className="px-4 py-2 text-blue-700 font-semibold border border-blue-400 rounded-lg hover:bg-blue-200 transition"
          >
            Logout
          </Link>
         
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
