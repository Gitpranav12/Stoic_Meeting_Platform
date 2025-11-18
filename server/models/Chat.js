const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  type: { type: String, enum: ['private','group'], required: true },
  name: { type: String },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  avatarUrl: { type: String, default: '' },
  lastMessageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', ChatSchema);
