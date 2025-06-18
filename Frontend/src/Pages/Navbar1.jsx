import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCircleUser } from "react-icons/fa6";

const Navbar1 = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        console.error("Failed parsing stored user");
      }
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);         // Clear state
    navigate("/login");    // Redirect to login page
  };

  return (
    <nav className="bg-blue-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="https://tse3.mm.bing.net/th?id=OIP.G5Z5KqW9wN-2hH9EqFhiDQAAAA&pid=Api&P=0&h=180"
            alt="Logo"
            className="h-11 w-11 rounded-full"
          />
          <span className="text-blue-800 font-bold text-xl">HelpHub</span>
        </div>

        {/* User dropdown */}
        {user && (
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setOpen(!open)}>
              <FaCircleUser className="h-8 w-10 text-gray-600" />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="px-4 py-2 text-sm text-gray-700">
                  {user.email}
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar1;
