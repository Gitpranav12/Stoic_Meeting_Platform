// src/api/uiHelpers.js
import chatService from './chatService';

/**
 * Create or get private chat with otherUserId, refresh chat list and open chat.
 * - otherUserId: string
 */
export async function openPrivateChat(otherUserId) {
  if (!otherUserId) throw new Error('otherUserId required');
  try {
    const chat = await chatService.createOrGetPrivate(otherUserId);
    const chatId = chat._id || chat.id || chat;

    // store id so ChatDashboard can auto-select after refresh
    localStorage.setItem('stoic_select_chat', String(chatId));

    // refresh chat list if that global helper exists
    if (window.__refreshChats) window.__refreshChats();

    // dispatch a custom event so mounted ChatDashboard can respond immediately
    try {
      window.dispatchEvent(new CustomEvent('openChat', { detail: { chatId: String(chatId) } }));
    } catch (e) {
      // fallback for older browsers (rare)
      const ev = document.createEvent('CustomEvent');
      ev.initCustomEvent('openChat', true, true, { chatId: String(chatId) });
      window.dispatchEvent(ev);
    }

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
    try {
      window.dispatchEvent(new CustomEvent('openChat', { detail: { chatId: String(chatId) } }));
    } catch (e) {
      const ev = document.createEvent('CustomEvent');
      ev.initCustomEvent('openChat', true, true, { chatId: String(chatId) });
      window.dispatchEvent(ev);
    }
    return chat;
  } catch (err) {
    console.error('createGroupQuick failed', err);
    throw err;
  }
}
