const Chat = require('../models/Chat');

class ChatRepository {
  async create(chat) {
    const c = new Chat(chat);
    return c.save();
  }
  async findById(id) {
    return Chat.findById(id).populate('participants lastMessageId');
  }
  async findPrivateBetween(userA, userB) {
    return Chat.findOne({ type: 'private', participants: { $all: [userA, userB], $size: 2 } }).populate('participants lastMessageId');
  }
  async findByUser(userId) {
    return Chat.find({ participants: userId }).populate('participants lastMessageId').sort({ updatedAt: -1 });
  }
  async updateLastMessage(chatId, messageId) {
    return Chat.findByIdAndUpdate(chatId, { lastMessageId: messageId, updatedAt: new Date() }, { new: true });
  }
}

module.exports = new ChatRepository();
