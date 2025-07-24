import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data.token);
      navigate('/');
    } catch {
      setErrorMsg('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">HelpHub</h1>
          <p className="text-sm text-gray-500">Support made easy at <a href="https://helphub.com" className="text-blue-500 underline" target="_blank" rel="noreferrer">helphub.com</a></p>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-center">Login to your account</h2>

        {errorMsg && (
          <p className="text-red-600 text-sm mb-4 text-center">{errorMsg}</p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Don't have an account?</p>
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="mt-1 text-blue-600 hover:underline text-sm"
          >
            Register Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
