import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import FAQs from "./pages/FAQs";
import Search from "./pages/Search";
import Feedback from "./pages/Feedback";
import Ticket from "./pages/Ticket";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import JobSearch from "./pages/JobSearch";
import ZumperSearch from "./pages/PropertySearch";

const AppLayout = () => {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/register"];

  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faqs"
          element={
            <ProtectedRoute>
              <FAQs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />
          <Route
          path="/jobsearch"
          element={
            <ProtectedRoute>
              <JobSearch />
            </ProtectedRoute>
          }
        />
         <Route
          path="/propertysearch"
          element={
            <ProtectedRoute>
              <ZumperSearch />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ticket"
          element={
            <ProtectedRoute>
              <Ticket />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
};

export default App;
