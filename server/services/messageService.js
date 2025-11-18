const messageRepo = require('../repositories/messageRepository');
const chatRepo = require('../repositories/chatRepository');

class MessageService {
  async sendMessage({ chatId, senderId, content, messageType='text', attachments=[] }) {
    const msg = await messageRepo.create({ chatId, senderId, content, messageType, attachments });
    // update chat's last message
    await chatRepo.updateLastMessage(chatId, msg._id);
    return msg;
  }
  async getMessages(chatId, page=0, limit=50) {
    return messageRepo.findByChat(chatId, page, limit);
  }
  async searchMessages(q) {
    return messageRepo.searchByContent(q);
  }
}

module.exports = new MessageService();
