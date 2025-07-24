import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true }
}, { timestamps: true });

export const FAQ = mongoose.model('FAQ', faqSchema);
export default FAQ;
