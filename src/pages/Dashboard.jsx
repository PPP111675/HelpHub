// const Dashboard = () => {
//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <p>Welcome, Admin. Use the sidebar to manage content.</p>
//     </div>
//   );
// };

// export default Dashboard;
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-12 max-w-2xl w-full text-center border border-gray-100">
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">
            Admin Dashboard
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto"></div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-100">
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            Welcome, <span className="text-blue-600 font-semibold">Admin</span>. 
            Use the sidebar to manage content.
          </p>
          
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <div className="text-xs text-gray-400 font-medium tracking-wider uppercase">
            Admin Panel v2.0
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;