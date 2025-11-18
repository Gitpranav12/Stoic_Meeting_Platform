const Message = require('../models/Message');

class MessageRepository {
  async create(message) {
    const m = new Message(message);
    return m.save();
  }
  async findByChat(chatId, page=0, limit=50) {
    return Message.find({ chatId }).sort({ createdAt: -1 }).skip(page*limit).limit(limit).populate('senderId');
  }
  async findById(id) {
    return Message.findById(id).populate('senderId');
  }
  async searchByContent(q, limit=20) {
    return Message.find({ $text: { $search: q } }).limit(limit).populate('senderId chatId');
  }
}

module.exports = new MessageRepository();
