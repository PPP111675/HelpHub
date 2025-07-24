// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div style={{ width: '200px', background: '#eee', padding: '10px' }}>
//       <ul>
//         <li><Link to="/dashboard">Dashboard</Link></li>
//         <li><Link to="/faqs">FAQs</Link></li>
//         <li><Link to="/tickets">Tickets</Link></li>
//         <li><Link to="/feedback">Feedback</Link></li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
import { Link } from "react-router-dom";

import { BarChart3, HelpCircle, Ticket, MessageSquare } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-52 bg-white shadow-lg border-r border-gray-200 p-4">
      <ul className="space-y-2">
        <li>
          <Link 
            to="/dashboard" 
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
          >
            <BarChart3 className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link 
            to="/faqs" 
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-green-50 hover:text-green-600 transition-all duration-200 group"
          >
            <HelpCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium">FAQs</span>
          </Link>
        </li>
        <li>
          <Link 
            to="/tickets" 
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-all duration-200 group"
          >
            <Ticket className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium">Tickets</span>
          </Link>
        </li>
        <li>
          <Link 
            to="/feedback" 
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 group"
          >
            <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium">Feedback</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;