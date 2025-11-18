const messageService = require('../services/messageService');

exports.sendMessage = async (req, res) => {
  try {
    const { chatId, content, messageType } = req.body;
    const senderId = req.user.id;
    const attachments = []; // file handling to be added
    const msg = await messageService.sendMessage({ chatId, senderId, content, messageType, attachments });
    return res.json(msg);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
