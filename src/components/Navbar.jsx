// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear token from localStorage or sessionStorage
//     localStorage.removeItem('token'); // or sessionStorage.removeItem('token');

//     // Optionally clear other user-related data
//     // localStorage.clear(); // if you want to clear everything

//     // Redirect to login page
//     navigate('/');
//   };

//   return (
//     <div style={{
//       background: '#333',
//       color: '#fff',
//       padding: '10px',
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center'
//     }}>
//       <div>Admin Panel</div>
//       <button
//         onClick={handleLogout}
//         style={{
//           background: '#f44336',
//           color: '#fff',
//           border: 'none',
//           padding: '8px 12px',
//           cursor: 'pointer',
//           borderRadius: '4px'
//         }}
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Navbar;
import React from 'react';
import { LogOut, Shield } from 'lucide-react';

// Mock useNavigate for demo purposes
const useNavigate = () => {
  return (path) => {
    console.log(`Navigating to: ${path}`);
  };
};

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
       navigate('/');
       window.location.reload()
    // Clear token from localStorage or sessionStorage
    localStorage.removeItem('token'); // or sessionStorage.removeItem('token');
    

    // Optionally clear other user-related data
    // localStorage.clear(); // if you want to clear everything

    // Redirect to login page
 
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-lg border-b border-gray-700">
      <div className="flex items-center space-x-3">
        <div className="bg-blue-600 p-2 rounded-lg shadow-md">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold tracking-wide">Admin Panel</span>
      </div>
      
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
      >
        <LogOut className="w-4 h-4" />
        <span className="font-medium">Logout</span>
      </button>
    </div>
  );
};

export default Navbar;