import { useEffect, useRef, useState } from 'react';
import api from '../services/api';

const Chat = () => {
  const [msg, setMsg] = useState('');
  const [history, setHistory] = useState([]);
  const [lang, setLang] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const send = async () => {
    if (!msg.trim() || isLoading) return;

    const userMessage = msg;
    setHistory((prev) => [...prev, { from: 'user', text: userMessage }]);
    setMsg('');
    setIsLoading(true);

    try {
      const { data } = await api.post('/chat', {
        message: userMessage,
        language: lang,
      });

      // Detect if response contains formatted links (job/rentals)
      const isHtml = /\[(Apply Now|View Listing)\]\(.*?\)/.test(data.reply);

      setHistory((prev) => [
        ...prev,
        {
          from: 'bot',
          text: data.reply,
          isHtml: isHtml,
        },
      ]);
    } catch (err) {
      setHistory((prev) => [
        ...prev,
        { from: 'bot', text: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const renderFormattedText = (text) => {
    const html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[Apply Now\]\((.*?)\)/g, `<a href="$1" class="text-blue-600 hover:text-blue-800 underline font-medium transition-colors duration-200" target="_blank" rel="noopener noreferrer">Apply Now</a>`)
      .replace(/\[View Listing\]\((.*?)\)/g, `<a href="$1" class="text-green-600 hover:text-green-800 underline font-medium transition-colors duration-200" target="_blank" rel="noopener noreferrer">View Listing</a>`)
      .replace(/\n/g, '<br/>');
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  };

  const LoadingDots = () => (
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-blue-50 shadow-2xl rounded-2xl flex flex-col h-[85vh] border border-slate-200">
      {/* Header */}
      <div className="text-center mb-6 pb-4 border-b border-slate-200">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          AI Assistant Chat
        </h2>
        <p className="text-sm text-slate-600 mt-2">
          Ask about jobs, rentals, or anything else you need help with
        </p>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-6 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200 shadow-inner">
        {history.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">Start a conversation</h3>
            <p className="text-slate-500 text-sm">
              Try asking about "React jobs in Toronto" or "Rentals in Vancouver"
            </p>
          </div>
        )}
        
        {history.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div
              className={`max-w-[80%] px-5 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
                m.from === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-bl-md'
              }`}
            >
              <div className="whitespace-pre-wrap leading-relaxed">
                {m.isHtml ? renderFormattedText(m.text) : m.text}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-white text-slate-800 border border-slate-200 px-5 py-3 rounded-2xl rounded-bl-md shadow-sm">
              <LoadingDots />
            </div>
          </div>
        )}
        
        <div ref={chatEndRef}></div>
      </div>

      {/* Input Area */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-slate-200 shadow-lg">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            />
            {msg.trim() && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
          <button
            onClick={send}
            disabled={!msg.trim() || isLoading}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-400 disabled:to-slate-400 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:hover:shadow-lg transform hover:scale-105 disabled:hover:scale-100 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              <>
                Send
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </>
            )}
          </button>
        </div>
        <div className="flex justify-between items-center mt-3 text-xs text-slate-500">
          <span>Press Enter to send • Shift+Enter for new line</span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Connected
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Chat;