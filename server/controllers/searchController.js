const userRepo = require('../repositories/userRepository');
const messageService = require('../services/messageService');

exports.search = async (req, res) => {
  try {
    const q = req.query.q || '';
    if (!q) return res.json({ users: [], messages: [] });
    const users = await userRepo.searchByNameOrEmail(q, 10);
    const messages = await messageService.searchMessages(q);
    return res.json({ users, messages });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
