import { useEffect, useState } from 'react';
import api from '../services/api';

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [search, setSearch] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    api.get('/faqs').then(res => setFaqs(res.data));
  }, []);

  const filtered = faqs.filter(faq =>
    faq.question.toLowerCase().includes(search.toLowerCase()) ||
    faq.answer.toLowerCase().includes(search.toLowerCase()) ||
    faq.topic?.toLowerCase().includes(search.toLowerCase())
  );

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">FAQs</h2>

      <input
        type="text"
        placeholder="Search FAQs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
      />

      {filtered.length === 0 ? (
        <p className="text-gray-500">No FAQs match your search.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded">
              <button
                onClick={() => toggleExpand(index)}
                className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 font-medium flex justify-between items-center"
              >
                <span>{faq.question}</span>
                <span className="text-xl">{expandedIndex === index ? '−' : '+'}</span>
              </button>
              {expandedIndex === index && (
                <div className="px-4 py-2 bg-white">
                  {faq.topic && (
                    <p className="text-sm text-blue-500 mb-1">Topic: {faq.topic}</p>
                  )}
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FAQs;
