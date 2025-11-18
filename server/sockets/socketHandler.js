const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/userRepository');
const chatService = require('../services/chatService');
const messageService = require('../services/messageService');

module.exports = (io) => {
  const onlineUsers = new Map(); // userId -> socket.id(s)

  io.on('connection', (socket) => {
    //console.log('Socket connected', socket.id);

    let currentUserId = null;

    socket.on('auth:token', async (token) => {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        currentUserId = payload.id;
        // store online
        if (!onlineUsers.has(currentUserId)) onlineUsers.set(currentUserId, new Set());
        onlineUsers.get(currentUserId).add(socket.id);

        // join rooms for user's chats (optional: load chats and join)
        const chats = await chatService.listChatsForUser(currentUserId);
        chats.forEach(c => {
          socket.join(c._id.toString());
        });

        // notify others
        io.emit('user:online', { userId: currentUserId });
        socket.emit('auth:ok', { userId: currentUserId });
      } catch (err) {
        //console.log('Socket auth failed', err.message);
        socket.emit('auth:error', { message: 'Invalid token' });
        socket.disconnect(true);
      }
    });

    socket.on('message:send', async (payload) => {
      // payload: { chatId, content, messageType }
      try {
        if (!currentUserId) {
          socket.emit('error', { message: 'Not authenticated' });
          return;
        }
        const msg = await messageService.sendMessage({
          chatId: payload.chatId,
          senderId: currentUserId,
          content: payload.content,
          messageType: payload.messageType || 'text',
          attachments: payload.attachments || []
        });
        // emit to room
        io.to(payload.chatId).emit('message:received', msg);
      } catch (err) {
        socket.emit('error', { message: err.message });
      }
    });

    socket.on('message:typing', (payload) => {
      // payload: { chatId, isTyping }
      if (!currentUserId) return;
      socket.to(payload.chatId).emit('message:typing', { chatId: payload.chatId, userId: currentUserId, isTyping: payload.isTyping });
    });

    socket.on('disconnect', () => {
      if (currentUserId) {
        const set = onlineUsers.get(currentUserId);
        if (set) {
          set.delete(socket.id);
          if (set.size === 0) {
            onlineUsers.delete(currentUserId);
            io.emit('user:offline', { userId: currentUserId });
          }
        }
      }
    //  console.log('Socket disconnected', socket.id);
    });

  });
};
