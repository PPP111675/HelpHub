import { useEffect, useState } from 'react';
import api from '../services/api';

const Feedback = () => {
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const { data } = await api.get('/feedback/me'); // Ensure this route exists
      setFeedbacks(data);
    } catch (err) {
      console.error('Failed to fetch feedback:', err);
    }
  };

  const submit = async () => {
    if (!message.trim()) {
      setStatusMsg('❗ Please enter a comment.');
      return;
    }

    try {
      await api.post('/feedback', { rating, message });
      setStatusMsg('✅ Thank you for your feedback!');
      setMessage('');
      setRating(5);
      fetchFeedbacks();
    } catch (err) {
      setStatusMsg('❌ Failed to submit feedback.');
    }
  };

  const renderStars = (count) => {
    return '⭐'.repeat(count) + '☆'.repeat(5 - count);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Give Feedback</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(+e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} - {renderStars(n)}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <textarea
          placeholder="Write your feedback..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <button
        onClick={submit}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
      >
        Submit Feedback
      </button>

      {statusMsg && <p className="mt-4 text-sm text-gray-700">{statusMsg}</p>}

      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-3">Your Previous Feedback</h3>
        {feedbacks.length === 0 ? (
          <p className="text-gray-500">No feedback submitted yet.</p>
        ) : (
          <ul className="space-y-4">
            {feedbacks.map((fb) => (
              <li
                key={fb._id}
                className="bg-gray-50 p-4 border border-gray-200 rounded shadow-sm"
              >
                <p className="text-yellow-600 text-sm mb-1">
                  {renderStars(fb.rating)}
                </p>
                <p className="text-gray-800 italic">"{fb.message}"</p>
                {fb.createdAt && (
                  <p className="text-xs text-gray-500 mt-1">
                    Submitted on {new Date(fb.createdAt).toLocaleString()}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Feedback;
