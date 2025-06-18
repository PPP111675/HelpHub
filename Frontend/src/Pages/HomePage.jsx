import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

const Homepage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-indigo-800 mb-6 drop-shadow-lg"
        >
          Welcome to HelpHub
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg text-indigo-700 max-w-2xl mb-10"
        >
          Your personal AI assistant for all things education. Get instant, accurate,
          and focused answers to your academic questions.
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/chat">
            <button className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition">
              Get Started
            </button>
          </Link>
        </motion.div>
      </div>
      <footer className="text-center p-4 text-sm text-indigo-600">
        © {new Date().getFullYear()} HelpHub All rights reserved.
      </footer>
    </div>
  );
};

export default Homepage;
