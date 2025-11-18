// src/api/socket.js
import { io } from 'socket.io-client';

const serverUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

let socket = null;

export const connectSocket = (onConnect) => {
  if (socket) return socket;
  socket = io(serverUrl, { transports: ['websocket', 'polling'] });

  socket.on('connect', () => {
    const token = localStorage.getItem('authToken');
    if (token) socket.emit('auth:token', token);
    if (onConnect) onConnect(socket);
  });

  socket.on('disconnect', () => {
    // console.log('socket disconnected');
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (!socket) return;
  socket.disconnect();
  socket = null;
};
