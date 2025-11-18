// src/api/uiHelpers.js
import chatService from './chatService';

/**
 * Create or get private chat with otherUserId, refresh chat list and open chat.
 * - otherUserId: string
 * - options: { openImmediately: true } (if you want to call handleSelectChat directly from parent)
 */
export async function openPrivateChat(otherUserId) {
  if (!otherUserId) throw new Error('otherUserId required');
  try {
    const chat = await chatService.createOrGetPrivate(otherUserId);
    // store id so ChatDashboard can auto-select after refresh
    const chatId = chat._id || chat.id || chat;
    localStorage.setItem('stoic_select_chat', String(chatId));
    // refresh chat list if that global helper exists
    if (window.__refreshChats) window.__refreshChats();
    return chat;
  } catch (err) {
    console.error('openPrivateChat failed', err);
    throw err;
  }
}


/**
 * Create a group chat quickly. Use as a debug button or temporary UI.
 * - name: string group name
 * - participantIds: array of user ids (strings)
 */
export async function createGroupQuick(name, participantIds = []) {
  if (!name || !participantIds.length) throw new Error('name and participantIds required');
  try {
    const chat = await chatService.createGroup(name, participantIds);
    const chatId = chat._id || chat.id || chat;
    localStorage.setItem('stoic_select_chat', String(chatId));
    if (window.__refreshChats) window.__refreshChats();
    return chat;
  } catch (err) {
    console.error('createGroupQuick failed', err);
    throw err;
  }
}