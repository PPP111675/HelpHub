import mongoose from 'mongoose';

const chatLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String },
  reply: { type: String },
  language: { type: String, default: 'en' }
}, { timestamps: true });

export const ChatLog = mongoose.model('ChatLog', chatLogSchema);
export default chatLogSchema;
