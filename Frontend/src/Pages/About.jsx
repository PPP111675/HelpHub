import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
const faqs = [
  {
    question: "Is HelpHub free to use?",
    answer: "Yes! HelpHub is completely free and always ready to help you learn.",
  },
  {
    question: "Can I ask questions outside of academics?",
    answer: "HelpHub is strictly for educational use and won’t respond to unrelated topics.",
  },
  {
    question: "How does HelpHub get its answers?",
    answer: "HelpHub is powered by advanced AI that understands and responds to educational queries accurately.",
  },
];

const About = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-80 to-indigo-100 p-8 text-gray-800">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center text-blue-700 mb-6"
        >
          🎓 Welcome to HelpHub!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-center text-lg max-w-3xl mx-auto mb-10"
        >
          Your AI-powered buddy that makes learning fun, focused, and fast! 🚀
          Ask questions, get answers, and explore the world of education — one topic at a time.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl p-6 shadow-md border-t-4 border-sky-300"
          >
            <h2 className="text-xl font-semibold text-sky-600 mb-2">📚 What Can You Ask?</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Math and Science questions</li>
              <li>Programming doubts (Python, JS, etc.)</li>
              <li>History & Geography topics</li>
              <li>Grammar & Study tips</li>
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl p-6 shadow-md border-t-4 border-indigo-200"
          >
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">⛔ What HelpHub Won't Do</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>No entertainment or personal chats</li>
              <li>No medical/legal/political advice</li>
              <li>No non-educational content</li>
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl p-6 shadow-md border-t-4 border-purple-200 col-span-full"
          >
            <h2 className="text-xl font-semibold text-purple-600 mb-2">💡 Why HelpHub is Cool</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Fast responses powered by AI</li>
              <li>Beautiful and clean interface</li>
              <li>Available 24/7 for all your study needs</li>
              <li>Focuses only on learning — nothing else!</li>
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ rotate: [0, 1, -1, 0], transition: { duration: 0.4 } }}
            className="bg-gradient-to-tr from-blue-100 to-sky-100 p-6 rounded-2xl shadow-md text-center col-span-full"
          >
            <p className="text-lg text-gray-800 font-semibold">
              🌟 Crafted with care by student minds — built to boost your brilliance!
            </p>
          </motion.div>

          {/* FAQ Accordion Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-span-full mt-10"
          >
            <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">❓ Frequently Asked Questions</h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow border-l-4 border-sky-300 p-5 cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="font-semibold text-sky-700 text-lg flex justify-between items-center">
                    {faq.question}
                    <span className="text-2xl">{openIndex === index ? "−" : "+"}</span>
                  </h3>
                  {openIndex === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 text-gray-700"
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
         <Footer/>
      </div>
     
    </div>
  );
};

export default About;
