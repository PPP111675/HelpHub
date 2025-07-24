import Feedback from '../models/Feedback.js';

export const giveFeedback = async (req, res) => {
  const { userId, message, rating } = req.body;
  const fb = await Feedback.create({ userId, message, rating });
  res.status(201).json(fb);
};

export const getFeedbacks = async (req, res) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 });
  res.json(feedbacks);
};
export const getMyFeedback = async (req, res) => {
  const feedbacks = await Feedback.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(feedbacks);
};