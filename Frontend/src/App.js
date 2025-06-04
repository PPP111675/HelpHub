import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
// Dummy Home Page for after login
const HomePage = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray-100">
    <div className="bg-white shadow-md rounded-xl p-10 text-center">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Welcome to HelpHub!</h1>
      <p className="text-gray-700">You are logged in.</p>
    </div>
  </div>
);

function App() {
  // For demo, pretend to check localStorage for user
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
