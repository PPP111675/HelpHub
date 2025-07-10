import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Navbar from './Navbar';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://helphub-5.onrender.com/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      Swal.fire({
        title: 'Thank you! 💙',
        text: 'Thanks for reaching out!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      setFormData({ name: '', email: '', message: '' });
    } else {
      Swal.fire({
        title: 'Oops! ❌',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonText: 'Retry',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 text-gray-800">
      <Navbar />
      <div className="flex justify-center items-center p-6">
        <div className="w-full max-w-xl bg-white/90 shadow-lg backdrop-blur-md rounded-2xl p-8 border border-blue-200">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">
            Contact Us 💬
          </h2>
          <p className="text-center text-blue-500 mb-6">
            We'd love to hear your thoughts, suggestions, or issues.
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-blue-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-blue-400"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 placeholder-blue-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 hover:shadow-md transition-all"
            >
              ✉️ Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
