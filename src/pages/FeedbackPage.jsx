// import { useEffect, useState } from 'react';
// import api from '../services/api';

// const FeedbackPage = () => {
//   const [feedbacks, setFeedbacks] = useState([]);

//   useEffect(() => {
//     api.get('/feedback').then(res => setFeedbacks(res.data));
//   }, []);

//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
//   };

//   const renderStars = (rating) => {
//     return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-6">User Feedback</h2>

//       <div className="space-y-4">
//         {feedbacks.length === 0 && (
//           <p className="text-gray-500">No feedback submitted yet.</p>
//         )}

//         {feedbacks.map(fb => (
//           <div key={fb._id} className="bg-white p-5 rounded-md shadow border border-gray-200">
//             <div className="mb-2 flex justify-between items-center">
//               <div>
//                 <h4 className="font-semibold text-lg text-gray-800">
//                   {fb.user?.name || 'Anonymous User'}
//                 </h4>
//                 {fb.user?.email && (
//                   <p className="text-sm text-gray-500">{fb.user.email}</p>
//                 )}
//               </div>
//               <span className="text-yellow-500 text-lg">
//                 {renderStars(fb.rating)}
//               </span>
//             </div>

//             <p className="text-gray-700 mt-2 italic">"{fb.message}"</p>

//             {fb.createdAt && (
//               <p className="text-sm text-gray-400 mt-3">
//                 Submitted on {formatDate(fb.createdAt)}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FeedbackPage;
import { useEffect, useState } from 'react';
import api from '../services/api';
import { 
  MessageSquare, 
  Star, 
  User, 
  Mail, 
  Calendar, 
  TrendingUp,
  Filter,
  Search,
  RefreshCw,
  BarChart3,
  Users,
  Award,
  AlertCircle
} from 'lucide-react';

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    loadFeedbacks();
  }, []);

  useEffect(() => {
    filterFeedbacks();
  }, [feedbacks, searchTerm, ratingFilter]);

  const loadFeedbacks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/feedback');
      
      // Validate required fields and filter out invalid entries
      const validFeedbacks = res.data.filter(feedback => {
        const hasValidRating = feedback.rating && feedback.rating >= 1 && feedback.rating <= 5;
        const hasValidMessage = feedback.message && feedback.message.trim().length > 0;
        
        if (!hasValidRating || !hasValidMessage) {
          console.warn('Invalid feedback entry found:', feedback);
          return false;
        }
        return true;
      });

      setFeedbacks(validFeedbacks);
      setFilteredFeedbacks(validFeedbacks);
    } catch (err) {
      console.error('Failed to load feedbacks:', err);
      setError('Failed to load feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterFeedbacks = () => {
    let filtered = feedbacks;

    // Filter by rating
    if (ratingFilter !== 'all') {
      const rating = parseInt(ratingFilter);
      filtered = filtered.filter(fb => fb.rating === rating);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(fb =>
        (fb.message && fb.message.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (fb.user?.name && fb.user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (fb.user?.email && fb.user.email.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredFeedbacks(filtered);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'No date provided';
    const date = new Date(dateStr);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const renderStars = (rating) => {
    if (!rating || rating < 1 || rating > 5) return '☆☆☆☆☆';
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const getStarColor = (rating) => {
    if (rating >= 4) return 'text-green-500';
    if (rating >= 3) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getRatingLabel = (rating) => {
    const labels = {
      5: 'Excellent',
      4: 'Good', 
      3: 'Average',
      2: 'Poor',
      1: 'Very Poor'
    };
    return labels[rating] || 'Unknown';
  };

  const getFeedbackStats = () => {
    if (feedbacks.length === 0) {
      return {
        total: 0,
        averageRating: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        positivePercentage: 0
      };
    }

    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let totalRating = 0;

    feedbacks.forEach(fb => {
      if (fb.rating >= 1 && fb.rating <= 5) {
        distribution[fb.rating]++;
        totalRating += fb.rating;
      }
    });

    const averageRating = totalRating / feedbacks.length;
    const positiveCount = distribution[4] + distribution[5];
    const positivePercentage = (positiveCount / feedbacks.length) * 100;

    return {
      total: feedbacks.length,
      averageRating: Math.round(averageRating * 10) / 10,
      distribution,
      positivePercentage: Math.round(positivePercentage)
    };
  };

  const stats = getFeedbackStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading feedback...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <MessageSquare className="w-8 h-8 text-blue-600" />
                User Feedback
              </h1>
              <p className="text-gray-600 mt-1">Monitor and analyze customer satisfaction</p>
            </div>
            <button 
              onClick={loadFeedbacks}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors duration-200"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Feedback</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-yellow-600">{stats.averageRating}</p>
                  <Star className="w-6 h-6 text-yellow-500 fill-current" />
                </div>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Positive Feedback</p>
                <p className="text-3xl font-bold text-green-600">{stats.positivePercentage}%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Contributors</p>
                <p className="text-3xl font-bold text-purple-600">
                  {feedbacks.filter(fb => fb.user?.name).length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Rating Distribution
          </h3>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map(rating => {
              const count = stats.distribution[rating];
              const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
              return (
                <div key={rating} className="flex items-center gap-4">
                  <div className="flex items-center gap-1 w-20">
                    <span className="text-sm font-medium">{rating}</span>
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-16">{count} ({Math.round(percentage)}%)</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search feedback, users, or emails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div className="relative">
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
          </div>
        </div>

        {/* Feedback List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {filteredFeedbacks.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback found</h3>
              <p className="text-gray-500">
                {feedbacks.length === 0 
                  ? "No feedback has been submitted yet." 
                  : "Try adjusting your filters to see more feedback."
                }
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredFeedbacks.map((fb) => (
                <div key={fb._id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {fb.user?.name || 'Anonymous User'}
                        </h4>
                        {fb.user?.email && (
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Mail className="w-4 h-4" />
                            {fb.user.email}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-2xl mb-1 ${getStarColor(fb.rating)}`}>
                        {renderStars(fb.rating)}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">
                          {fb.rating}/5
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          fb.rating >= 4 ? 'bg-green-100 text-green-800' :
                          fb.rating >= 3 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {getRatingLabel(fb.rating)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-700 leading-relaxed italic">
                      "{fb.message || 'No message provided'}"
                    </p>
                  </div>

                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Submitted on {formatDate(fb.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;