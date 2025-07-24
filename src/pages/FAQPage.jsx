// import { useEffect, useState } from "react";
// import api from "../services/api";

// const FAQPage = () => {
//   const [faqs, setFaqs] = useState([]);
//   const [form, setForm] = useState({ topic: "", question: "", answer: "" });

//   useEffect(() => {
//     api.get("/faqs").then((res) => setFaqs(res.data));
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { data } = await api.post("/faqs", form);
//     setFaqs([...faqs, data]);
//     setForm({ topic: "", question: "", answer: "" });
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h2 className="text-2xl font-semibold mb-6">
//         Frequently Asked Questions
//       </h2>

//       <form
//         onSubmit={handleSubmit}
//         className="space-y-4 bg-gray-100 p-6 rounded-md shadow"
//       >
//         <input
//           type="text"
//           placeholder="Topic"
//           value={form.topic}
//           onChange={(e) => setForm({ ...form, topic: e.target.value })}
//           className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="text"
//           placeholder="Question"
//           value={form.question}
//           onChange={(e) => setForm({ ...form, question: e.target.value })}
//           className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="text"
//           placeholder="Answer"
//           value={form.answer}
//           onChange={(e) => setForm({ ...form, answer: e.target.value })}
//           className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//         >
//           Add FAQ
//         </button>
//       </form>

//       <ul className="mt-8 space-y-4">
//         {faqs.map((faq) => (
//           <li
//             key={faq._id}
//             className="bg-white p-4 border border-gray-200 rounded shadow-sm"
//           >
//             <h4 className="text-lg font-bold text-gray-800">{faq.topic}</h4>
//             <p className="text-gray-700 mt-1">
//               <strong>Q:</strong> {faq.question}
//             </p>
//             <p className="text-gray-600">
//               <strong>A:</strong> {faq.answer}
//             </p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FAQPage;
import { useEffect, useState } from "react";
import api from "../services/api";
import { 
  HelpCircle, 
  Plus, 
  Search, 
  Filter,
  Edit3,
  Trash2,
  Save,
  X,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Hash,
  MessageCircle,
  Lightbulb,
  Eye,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const FAQPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [form, setForm] = useState({ topic: "", question: "", answer: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [topicFilter, setTopicFilter] = useState("all");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ topic: "", question: "", answer: "" });
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadFaqs();
  }, []);

  useEffect(() => {
    filterFaqs();
  }, [faqs, searchTerm, topicFilter]);

  const loadFaqs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/faqs");
      
      // Validate required fields
      const validFaqs = res.data.filter(faq => {
        const hasValidTopic = faq.topic && faq.topic.trim().length > 0;
        const hasValidQuestion = faq.question && faq.question.trim().length > 0;
        const hasValidAnswer = faq.answer && faq.answer.trim().length > 0;
        
        if (!hasValidTopic || !hasValidQuestion || !hasValidAnswer) {
          console.warn('Invalid FAQ entry found:', faq);
          return false;
        }
        return true;
      });

      setFaqs(validFaqs);
      setFilteredFaqs(validFaqs);
    } catch (error) {
      console.error('Failed to load FAQs:', error);
      setErrors({ general: 'Failed to load FAQs. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const filterFaqs = () => {
    let filtered = faqs;

    // Filter by topic
    if (topicFilter !== "all") {
      filtered = filtered.filter(faq => 
        faq.topic.toLowerCase() === topicFilter.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(faq =>
        faq.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredFaqs(filtered);
  };

  const validateForm = (formData) => {
    const newErrors = {};

    if (!formData.topic || formData.topic.trim().length === 0) {
      newErrors.topic = 'Topic is required';
    } else if (formData.topic.trim().length < 2) {
      newErrors.topic = 'Topic must be at least 2 characters long';
    } else if (formData.topic.trim().length > 100) {
      newErrors.topic = 'Topic must be less than 100 characters';
    }

    if (!formData.question || formData.question.trim().length === 0) {
      newErrors.question = 'Question is required';
    } else if (formData.question.trim().length < 5) {
      newErrors.question = 'Question must be at least 5 characters long';
    } else if (formData.question.trim().length > 500) {
      newErrors.question = 'Question must be less than 500 characters';
    }

    if (!formData.answer || formData.answer.trim().length === 0) {
      newErrors.answer = 'Answer is required';
    } else if (formData.answer.trim().length < 5) {
      newErrors.answer = 'Answer must be at least 5 characters long';
    } else if (formData.answer.trim().length > 2000) {
      newErrors.answer = 'Answer must be less than 2000 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setSubmitting(true);
    setErrors({});
    setSuccess("");

    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitting(false);
      return;
    }

    try {
      const { data } = await api.post("/faqs", {
        topic: form.topic.trim(),
        question: form.question.trim(),
        answer: form.answer.trim()
      });
      
      setFaqs([...faqs, data]);
      setForm({ topic: "", question: "", answer: "" });
      setSuccess("FAQ added successfully!");
      setShowForm(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error('Failed to add FAQ:', error);
      setErrors({ general: 'Failed to add FAQ. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const startEditing = (faq) => {
    setEditingId(faq._id);
    setEditForm({
      topic: faq.topic,
      question: faq.question,
      answer: faq.answer
    });
    setErrors({});
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({ topic: "", question: "", answer: "" });
    setErrors({});
  };

  const handleUpdate = async (id) => {
    setSubmitting(true);
    setErrors({});

    const validationErrors = validateForm(editForm);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitting(false);
      return;
    }

    try {
      const { data } = await api.put(`/faqs/${id}`, {
        topic: editForm.topic.trim(),
        question: editForm.question.trim(),
        answer: editForm.answer.trim()
      });
      
      setFaqs(faqs.map(faq => faq._id === id ? data : faq));
      setEditingId(null);
      setEditForm({ topic: "", question: "", answer: "" });
      setSuccess("FAQ updated successfully!");
      
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error('Failed to update FAQ:', error);
      setErrors({ general: 'Failed to update FAQ. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) {
      return;
    }

    try {
      await api.delete(`/faqs/${id}`);
      setFaqs(faqs.filter(faq => faq._id !== id));
      setSuccess("FAQ deleted successfully!");
      
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error('Failed to delete FAQ:', error);
      setErrors({ general: 'Failed to delete FAQ. Please try again.' });
    }
  };

  const getUniqueTopics = () => {
    const topics = faqs.map(faq => faq.topic).filter(Boolean);
    return [...new Set(topics)].sort();
  };

  const getFaqStats = () => {
    const topics = getUniqueTopics();
    return {
      total: faqs.length,
      topics: topics.length,
      averageAnswerLength: faqs.length > 0 
        ? Math.round(faqs.reduce((sum, faq) => sum + faq.answer.length, 0) / faqs.length)
        : 0
    };
  };

  const stats = getFaqStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading FAQs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <HelpCircle className="w-8 h-8 text-blue-600" />
                FAQ Management
              </h1>
              <p className="text-gray-600 mt-1">Manage frequently asked questions and answers</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={loadFaqs}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button 
                onClick={() => setShowForm(!showForm)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add FAQ
              </button>
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="text-green-800">{success}</p>
          </div>
        )}

        {errors.general && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800">{errors.general}</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total FAQs</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Topics</p>
                <p className="text-3xl font-bold text-purple-600">{stats.topics}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Hash className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Answer Length</p>
                <p className="text-3xl font-bold text-green-600">{stats.averageAnswerLength}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Add FAQ Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-600" />
              Add New FAQ
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topic *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Account Management, Billing, Technical Support"
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.topic ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  maxLength={100}
                />
                {errors.topic && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.topic}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question *
                </label>
                <textarea
                  placeholder="Enter the frequently asked question"
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical ${
                    errors.question ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  maxLength={500}
                />
                {errors.question && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.question}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answer *
                </label>
                <textarea
                  placeholder="Provide a comprehensive answer to the question"
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical ${
                    errors.answer ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  maxLength={2000}
                />
                {errors.answer && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.answer}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors duration-200 font-medium"
                >
                  {submitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  {submitting ? 'Adding...' : 'Add FAQ'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="inline-flex items-center px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search FAQs, topics, questions, or answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Topic Filter */}
            <div className="relative">
              <select
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Topics</option>
                {getUniqueTopics().map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs found</h3>
              <p className="text-gray-500">
                {faqs.length === 0 
                  ? "No FAQs have been created yet. Click 'Add FAQ' to get started." 
                  : "Try adjusting your filters to see more FAQs."
                }
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredFaqs.map((faq) => (
                <div key={faq._id} className="p-6">
                  {editingId === faq._id ? (
                    /* Edit Form */
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
                        <input
                          type="text"
                          value={editForm.topic}
                          onChange={(e) => setEditForm({ ...editForm, topic: e.target.value })}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.topic ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {errors.topic && <p className="text-red-600 text-sm mt-1">{errors.topic}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                        <textarea
                          value={editForm.question}
                          onChange={(e) => setEditForm({ ...editForm, question: e.target.value })}
                          rows={3}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.question ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {errors.question && <p className="text-red-600 text-sm mt-1">{errors.question}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
                        <textarea
                          value={editForm.answer}
                          onChange={(e) => setEditForm({ ...editForm, answer: e.target.value })}
                          rows={4}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.answer ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {errors.answer && <p className="text-red-600 text-sm mt-1">{errors.answer}</p>}
                      </div>
                      
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleUpdate(faq._id)}
                          disabled={submitting}
                          className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="inline-flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Display Mode */
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                              {faq.topic}
                            </span>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex items-start gap-2 mb-2">
                              <MessageCircle className="w-5 h-5 text-gray-600 mt-0.5" />
                              <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                                {faq.question}
                              </h3>
                            </div>
                          </div>

                          <div 
                            className={`transition-all duration-200 ${
                              expandedFaq === faq._id ? 'block' : 'hidden'
                            }`}
                          >
                            <div className="flex items-start gap-2 mb-4">
                              <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5" />
                              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                            </div>
                          </div>

                          <button
                            onClick={() => setExpandedFaq(expandedFaq === faq._id ? null : faq._id)}
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            {expandedFaq === faq._id ? 'Hide Answer' : 'Show Answer'}
                            {expandedFaq === faq._id ? 
                              <ChevronUp className="w-4 h-4 ml-1" /> : 
                              <ChevronDown className="w-4 h-4 ml-1" />
                            }
                          </button>
                        </div>

                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => startEditing(faq)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit FAQ"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(faq._id)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete FAQ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;