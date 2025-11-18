// src/api/messageService.js
import http from './http';

const getMessages = async (chatId, page = 0, limit = 50) => {
  const res = await http.get(`/api/chats/${chatId}/messages?page=${page}&limit=${limit}`);
  return res.data; // array of messages (server returns newest-first)
};

const sendMessageRest = async ({ chatId, content, messageType = 'text' }) => {
  const res = await http.post('/api/messages', { chatId, content, messageType });
  return res.data;
};

export default { getMessages, sendMessageRest };
