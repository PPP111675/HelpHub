import React, { useState,useEffect} from 'react';
import { motion } from 'framer-motion';
import Navbar1 from './Navbar1';
import Footer from './Footer';

const ChatbotUI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const formatTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
useEffect(() => {
  const greeting = {
    role: 'AI',
    content: '👋 Hello! I’m your study assistant. Ask me anything related to your academic subjects!',
    timestamp: formatTime(),
  };
  setMessages([greeting]);
}, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: formatTime(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const res = await fetch('https://helphub-5.onrender.com/api/chatbot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMessage = {
        role: 'bot',
        content: data.reply,
        timestamp: formatTime(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMsg = {
        role: 'bot',
        content: '❌ Sorry, something went wrong.',
        timestamp: formatTime(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar1 />

     <main
  className="flex-grow bg-cover bg-center flex items-center justify-center p-4"
  style={{
    backgroundImage: `url('https://thumb.photo-ac.com/8d/8d2e2a651a7368f9c02ac39ecd356f4d_t.jpeg')`,
  }}
>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl h-[90vh] rounded-3xl bg-white shadow-2xl flex flex-col border border-blue-200"
        >
          {/* Header */}
<div className="p-6 bg-blue-200 text-blue-900 rounded-t-3xl shadow-inner flex justify-between items-center">
  <div>
    <div className="text-2xl font-bold flex items-center gap-2">📘 HelpHub</div>
    <span className="text-sm font-medium text-blue-700 mt-1 block">
      Learn better. Ask smarter.
    </span>
  </div>

  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
   onClick={() =>
  setMessages([
    {
      role: 'AI',
      content: '👋 Hello! I’m your study assistant. Ask me anything related to your academic subjects!',
      timestamp: formatTime(),
    },
  ])
}

    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-50 hover:text-blue-600 border border-blue-300 text-sm font-semibold transition"
  >
    💬 New Chat
  </motion.button>
</div>


          {/* Messages */}
          <div
  className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-cover bg-center rounded-b-3xl"
  style={{
    backgroundImage: `url('https://www.steelmillgifts.com/cdn/shop/files/Shoot10_11-122_2000x.jpg?v=1684341101')`,
  }}
>
  {messages.map((msg, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: msg.role === 'user' ? 40 : -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className={`px-4 py-3 rounded-xl max-w-[75%] shadow-md relative ${
        msg.role === 'user'
          ? 'bg-blue-300 text-white self-end ml-auto'
          : 'bg-blue-100 text-blue-900 self-start mr-auto'
      }`}
    >
      <div className="flex items-start space-x-2">
        <span className="text-sm font-semibold">{msg.role === 'user' ? 'You:' : 'AI:'}</span>
        <span className="text-sm flex-1">{msg.content}</span>
      </div>
      <div className="text-[10px] text-right mt-1 text-blue-500">
        {msg.timestamp}
      </div>
    </motion.div>
  ))}
</div>

          {/* Input */}
          <div className="p-4 border-t border-blue-200 bg-blue-100 rounded-b-3xl flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask your education-related question..."
              className="flex-1 px-4 py-3 rounded-xl bg-white text-blue-900 placeholder-blue-400 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <button
              onClick={handleSend}
              className="px-6 py-3 bg-gradient-to-br from-blue-400 to-blue-500 text-white rounded-xl hover:brightness-105 transition shadow"
            >
              Send
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ChatbotUI;
