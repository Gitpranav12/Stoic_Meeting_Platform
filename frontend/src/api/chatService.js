// src/api/chatService.js
import http from './http';

const listChats = async () => {
  const res = await http.get('/api/chats');
  return res.data; // expected: array of chat objects
};

const createOrGetPrivate = async (otherUserId) => {
  const res = await http.post('/api/chats/private', { otherUserId });
  return res.data;
};

const createGroup = async (name, participantIds) => {
  const res = await http.post('/api/chats/group', { name, participantIds });
  return res.data;
};

// NEW: fetch one chat by id
const getChat = async (chatId) => {
  if (!chatId) throw new Error('chatId required');
  const res = await http.get(`/api/chats/${chatId}`);
  return res.data;
};

export default { listChats, createOrGetPrivate, createGroup, getChat };
