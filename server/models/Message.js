const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true, index: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, default: '' },
  messageType: { type: String, enum: ['text','image','file','system'], default: 'text' },
  attachments: [{ url: String, filename: String }],
  createdAt: { type: Date, default: Date.now }
});

// text index for search
MessageSchema.index({ content: 'text' });

module.exports = mongoose.model('Message', MessageSchema);
