import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaCircleUser } from "react-icons/fa6";

const MySwal = withReactContent(Swal);

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState({ name: "", email: "", universityId: "" ,password: ""});

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
    MySwal.fire({
      icon: "success",
      title: "Logged out!",
      text: "You have been logged out.",
      confirmButtonText: "OK",
    });
  };

  const openProfileModal = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch("http://localhost:5000/api/profile/getprofile", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setProfile({
        name: data.name,
        email: data.email,
        universityId: data.universityId,
        password:"",
      });
      setShowModal(true);
    } catch (err) {
      MySwal.fire("❌ Error", err.message || "Could not fetch profile", "error");
    }
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
const handleUpdateProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const payload = {
      name: profile.name,
      universityId: profile.universityId,
    };

    if (profile.password && profile.password.trim() !== "") {
      payload.password = profile.password;
    }

    const res = await fetch("http://localhost:5000/api/profile/updateprofile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    MySwal.fire("✅ Updated", "Profile updated successfully!", "success");
    setProfile((prev) => ({ ...prev, password: "" }));
    setShowModal(false);
  } catch (err) {
    MySwal.fire("❌ Error", err.message || "Profile update failed", "error");
  }
};


      


  return (
    <>
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

          <div className="hidden md:flex space-x-6 text-blue-800 font-medium">
            <Link to="/" className="hover:text-blue-600 transition">Home</Link>
            <Link to="/about" className="hover:text-blue-600 transition">About</Link>
            <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
          </div>
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
              <FaCircleUser className="h-8 w-8 text-gray-600" />
            </button>
            {dropdownOpen && user && (
              <div className="absolute right-0 mt-2 w-44 bg-white shadow-md rounded-lg border border-gray-200 z-50">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                  onClick={() => {
                    setDropdownOpen(false);
                    openProfileModal();
                  }}
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-blue-800">👤 Edit Profile</h2>
                       <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-blue-800 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border rounded-lg border-blue-300 focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-800 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  disabled
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border rounded-lg border-blue-300 focus:ring-2 focus:ring-blue-400" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-800 mb-1">University ID</label>
                <input
                  type="text"
                  name="universityId"
                  value={profile.universityId}
                  onChange={handleProfileChange}
                  placeholder="University ID"
                  className="w-full px-4 py-2 border rounded-lg border-blue-300 focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-800 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={profile.password || ""}
                  onChange={handleProfileChange}
                  placeholder="New Password (optional)"
                  className="w-full px-4 py-2 border rounded-lg border-blue-300 focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProfile}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                💾 Update
              </button>
            </div>
          </div>  
        </div>
      )}
    </>
  );
};

export default Navbar;

