import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  BookOpen, 
  Star, 
  Wrench, 
  Briefcase, 
  Home,
  ArrowRight,
  Sparkles,
  TrendingUp
} from 'lucide-react';

const Dashboard = () => {
  const links = [
    { 
      to: '/chat', 
      label: 'Chat with Bot', 
      icon: MessageCircle,
      description: 'Get instant answers and assistance',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      iconBg: 'bg-blue-100'
    },
    { 
      to: '/faqs', 
      label: 'Browse FAQs', 
      icon: BookOpen,
      description: 'Find answers to common questions',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50 hover:bg-emerald-100',
      iconBg: 'bg-emerald-100'
    },
    { 
      to: '/feedback', 
      label: 'Give Feedback', 
      icon: Star,
      description: 'Share your thoughts and suggestions',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50 hover:bg-amber-100',
      iconBg: 'bg-amber-100'
    },
    { 
      to: '/ticket', 
      label: 'Raise Support Ticket', 
      icon: Wrench,
      description: 'Get help with technical issues',
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50 hover:bg-red-100',
      iconBg: 'bg-red-100'
    },
    { 
      to: '/jobsearch', 
      label: 'Job Search', 
      icon: Briefcase,
      description: 'Discover career opportunities',
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
      iconBg: 'bg-purple-100'
    },
    { 
      to: '/propertysearch', 
      label: 'Property Search', 
      icon: Home,
      description: 'Find your perfect rental home',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 hover:bg-green-100',
      iconBg: 'bg-green-100'
    },
  ];

  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return 'Good Morning';
    if (currentHour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-6">
      

        {/* Main Navigation Grid */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
            Quick Actions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {links.map(({ to, label, icon: Icon, description, color, bgColor, iconBg }, idx) => (
              <Link
                to={to}
                key={idx}
                className={`group block p-6 bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-105 ${bgColor}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 ${iconBg} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-800">
                  {label}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700">
                  {description}
                </p>
                
                {/* Gradient accent bar */}
                <div className={`w-0 h-1 bg-gradient-to-r ${color} rounded-full mt-4 group-hover:w-full transition-all duration-500`}></div>
              </Link>
            ))}
          </div>
        </div>

        {/* Additional Info Section */}
       

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>© 2025 Your Dashboard. Designed for productivity and ease of use.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;