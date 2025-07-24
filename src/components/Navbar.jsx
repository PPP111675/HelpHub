import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();              // ✅ Clears token from localStorage
    navigate('/login');    // ✅ Redirect to login
  };

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow">
      <h1
        onClick={() => navigate('/')}
        className="text-xl font-bold cursor-pointer"
      >
        HelpHub<span className="text-yellow-300">.com</span>
      </h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm font-medium transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
