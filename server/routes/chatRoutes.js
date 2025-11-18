const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/private', authMiddleware, chatController.createOrGetPrivate);
router.post('/group', authMiddleware, chatController.createGroup);
router.get('/', authMiddleware, chatController.listChats);
router.get('/:chatId/messages', authMiddleware, chatController.getMessages);

module.exports = router;
