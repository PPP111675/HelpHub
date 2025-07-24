

import FAQ from '../models/FAQ.js';

export const getFAQs = async (req, res) => {
  const { topic, keyword } = req.query;
  let query = {};
  if (topic) query.topic = topic;
  if (keyword) query.question = { $regex: keyword, $options: 'i' };
  const faqs = await FAQ.find(query);
  res.json(faqs);
};

export const createFAQ = async (req, res) => {
  const faq = await FAQ.create(req.body);
  res.status(201).json(faq);
};

export const updateFAQ = async (req, res) => {
  const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(faq);
};

export const deleteFAQ = async (req, res) => {
  await FAQ.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
