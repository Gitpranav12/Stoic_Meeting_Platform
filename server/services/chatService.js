const chatRepo = require('../repositories/chatRepository');
const userRepo = require('../repositories/userRepository');

class ChatService {
  async getOrCreatePrivateChat(userId, otherUserId) {
    // try existing
    let chat = await chatRepo.findPrivateBetween(userId, otherUserId);
    if (chat) return chat;
    // create
    const users = await userRepo.findManyByIds([userId, otherUserId]);
    chat = await chatRepo.create({ type: 'private', participants: [userId, otherUserId] });
    return chat;
  }
  async createGroupChat({ name, participantIds, ownerId }) {
    const chat = await chatRepo.create({ type: 'group', name, participants: participantIds });
    return chat;
  }
  async listChatsForUser(userId) {
    return chatRepo.findByUser(userId);
  }
  async getChatById(chatId) {
    return chatRepo.findById(chatId);
  }
  async updateLastMessage(chatId, messageId) {
    return chatRepo.updateLastMessage(chatId, messageId);
  }
}

module.exports = new ChatService();
