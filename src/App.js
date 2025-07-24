import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';

import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import FAQPage from './pages/FAQPage';
import TicketsPage from './pages/TicketsPage';
import FeedbackPage from './pages/FeedbackPage';

import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

const AppRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/faqs"
        element={
          <ProtectedRoute>
            <Layout>
              <FAQPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tickets"
        element={
          <ProtectedRoute>
            <Layout>
              <TicketsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/feedback"
        element={
          <ProtectedRoute>
            <Layout>
              <FeedbackPage />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
