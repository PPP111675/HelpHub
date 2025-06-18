import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ChatbotUI from "./Pages/ChatbotUi";
import About from "./Pages/About";
import HomePage from "./Pages/HomePage";
import Contact from "./Pages/Contact";
function App() {
  // For demo, pretend to check localStorage for user
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/About" element={user?<About/>: <Navigate to="/login"/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<Contact />} />
         <Route path="/chat" element={user ? <ChatbotUI /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
export default App;
