// import { useEffect, useState } from "react";
// import api from "../services/api";

// const TicketsPage = () => {
//   const [tickets, setTickets] = useState([]);

//   useEffect(() => {
//     api.get("/tickets").then((res) => setTickets(res.data));
//   }, []);

//   const updateStatus = async (id, status) => {
//     await api.put(`/tickets/${id}`, { status });
//     setTickets((prev) =>
//       prev.map((t) => (t._id === id ? { ...t, status } : t))
//     );
//   };

//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString() + " " + date.toLocaleTimeString();
//   };

//   const statusBadge = (status) => {
//     const colorMap = {
//       open: "bg-green-100 text-green-800",
//       pending: "bg-yellow-100 text-yellow-800",
//       closed: "bg-red-100 text-red-800",
//     };
//     return `inline-block px-2 py-1 rounded text-xs font-medium ${
//       colorMap[status] || "bg-gray-100 text-gray-800"
//     }`;
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-6">Support Tickets</h2>

//       <div className="space-y-4">
//         {tickets.length === 0 && (
//           <p className="text-gray-500">No tickets available.</p>
//         )}

//         {tickets.map((t) => (
//           <div
//             key={t._id}
//             className="bg-white border border-gray-200 shadow-sm rounded-md p-5"
//           >
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="text-lg font-semibold text-gray-800">
//                 Ticket #{t._id.slice(-5)} — {t.user?.name || "Anonymous"}
//               </h3>
//               <span className={statusBadge(t.status)}>
//                 {t.status.toUpperCase()}
//               </span>
//             </div>

//             <p className="text-gray-700 mb-2 italic">"{t.message}"</p>

//             {t.priority && (
//               <p className="text-sm text-blue-600 mb-1">
//                 Priority: <strong>{t.priority}</strong>
//               </p>
//             )}

//             {t.user?.email && (
//               <p className="text-sm text-gray-500">
//                 Submitted by: {t.user.email}
//               </p>
//             )}

//             {t.createdAt && (
//               <p className="text-sm text-gray-400">
//                 Submitted on: {formatDate(t.createdAt)}
//               </p>
//             )}

//             <div className="mt-4">
//               <label className="text-sm font-medium text-gray-700 mr-2">
//                 Update Status:
//               </label>
//               <select
//                 value={t.status}
//                 onChange={(e) => updateStatus(t._id, e.target.value)}
//                 className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring focus:ring-blue-300"
//               >
//                 <option value="open">Open</option>
//                 <option value="pending">Pending</option>
//                 <option value="closed">Closed</option>
//               </select>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TicketsPage;


import { useEffect, useState } from "react";
import api from "../services/api";
import { 
  Ticket, 
  User, 
  Calendar, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Filter,
  Search,
  Mail,
  ChevronDown,
  RefreshCw,
  MoreVertical,
  Eye
} from "lucide-react";

const TicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    setLoading(true);
    try {
      const res = await api.get("/tickets");
      setTickets(res.data);
      setFilteredTickets(res.data);
    } catch (error) {
      console.error("Failed to load tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = tickets;

    // Filter by status
    if (filter !== "all") {
      filtered = filtered.filter(ticket => ticket.status === filter);
    }

    // Filter by priority
    if (priorityFilter !== "all") {
      filtered = filtered.filter(ticket => ticket.priority === priorityFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(ticket =>
        ticket.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket._id.includes(searchTerm)
      );
    }

    setFilteredTickets(filtered);
  }, [tickets, filter, searchTerm, priorityFilter]);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/tickets/${id}`, { status });
      setTickets((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status } : t))
      );
    } catch (error) {
      console.error("Failed to update ticket status:", error);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'closed':
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <XCircle className="w-4 h-4" />;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'open':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'closed':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'low':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getTicketStats = () => {
    const stats = {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'open').length,
      pending: tickets.filter(t => t.status === 'pending').length,
      closed: tickets.filter(t => t.status === 'closed').length
    };
    return stats;
  };

  const stats = getTicketStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tickets...</p>
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
                <Ticket className="w-8 h-8 text-blue-600" />
                Support Tickets
              </h1>
              <p className="text-gray-600 mt-1">Manage and track customer support requests</p>
            </div>
            <button 
              onClick={loadTickets}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Ticket className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open</p>
                <p className="text-3xl font-bold text-green-600">{stats.open}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Closed</p>
                <p className="text-3xl font-bold text-gray-600">{stats.closed}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-gray-600" />
              </div>
            </div>
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
                  placeholder="Search tickets, users, or ticket IDs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="pending">Pending</option>
                <option value="closed">Closed</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Priority Filter */}
            <div className="relative">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Priority</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {filteredTickets.length === 0 ? (
            <div className="text-center py-12">
              <Ticket className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
              <p className="text-gray-500">
                {tickets.length === 0 
                  ? "No support tickets have been submitted yet." 
                  : "Try adjusting your filters to see more tickets."
                }
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredTickets.map((ticket) => (
                <div key={ticket._id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          #{ticket._id.slice(-5)}
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusStyle(ticket.status)}`}>
                          {getStatusIcon(ticket.status)}
                          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityStyle(ticket.priority)}`}>
                          {ticket.priority ? `${ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority` : 'Normal Priority'}
                        </span>
                        {ticket.category && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                            {ticket.category}
                          </span>
                        )}
                      </div>

                      {/* Message */}
                      <div className="mb-4">
                        <p className="text-gray-900 leading-relaxed">
                          {ticket.message}
                        </p>
                      </div>

                      {/* User Info */}
                      <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span className="font-medium">{ticket.user?.name || 'Anonymous'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>{ticket.user?.email || 'No email'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{ticket.createdAt ? formatDate(ticket.createdAt) : 'No date'}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <label className="text-sm font-medium text-gray-700">
                            Status:
                          </label>
                          <select
                            value={ticket.status}
                            onChange={(e) => updateStatus(ticket._id, e.target.value)}
                            className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="open">Open</option>
                            <option value="pending">Pending</option>
                            <option value="closed">Closed</option>
                          </select>
                        </div>
                        
                        <button className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </div>
                    </div>

                    <div className="ml-4">
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
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

export default TicketsPage;