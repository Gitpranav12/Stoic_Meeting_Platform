const chatService = require('../services/chatService');

exports.createOrGetPrivate = async (req, res) => {
  try {
    const otherUserId = req.body.otherUserId;
    const userId = req.user.id;
    const chat = await chatService.getOrCreatePrivateChat(userId, otherUserId);
    return res.json(chat);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.createGroup = async (req, res) => {
  try {
    const { name, participantIds } = req.body;
    const ownerId = req.user.id;
    const chat = await chatService.createGroupChat({ name, participantIds, ownerId });
    return res.json(chat);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.listChats = async (req, res) => {
  try {
    const userId = req.user.id;
    const chats = await chatService.listChatsForUser(userId);
    return res.json(chats);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const page = parseInt(req.query.page || '0');
    const limit = parseInt(req.query.limit || '50');
    const msgs = await require('../services/messageService').getMessages(chatId, page, limit);
    return res.json(msgs);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
