// src/pages/ChatDashboard.jsx
import React, { useState, useEffect, useRef } from "react";
import ChatList from "./ChatList/ChatList";
import ChatWindow from "./ChatWindow/ChatWindow";
import chatService from "../../api/chatService";
import messageService from "../../api/messageService";
import { connectSocket, getSocket } from "../../api/socket";

// safe helper to get display name from a participant entry (object or id)
const participantDisplay = (p) => {
  if (!p) return null;
  if (typeof p === "string") return null; // id string only
  // common possible fields from backend: name, fullName, email, username
  return p.name || p.fullName || p.full_name || p.email || p.username || null;
};

export default function ChatDashboard() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [chatListTab, setChatListTab] = useState("groups"); // 'groups' | 'private'

  const [groupChats, setGroupChats] = useState([]);
  const [privateChats, setPrivateChats] = useState([]);
  const [messages, setMessages] = useState([]); // messages for selected chat
  const socketRef = useRef(null);

  // inside ChatDashboard.jsx (top of component)
  const [onlineUsers, setOnlineUsers] = useState(new Set()); // store online user ids
  const [lastSeenMap, setLastSeenMap] = useState({}); // { userId: timestamp }

  // --- responsive
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (!mobile) setShowChatWindow(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // connect socket once and listen to incoming messages
  useEffect(() => {
    const socket = connectSocket();
    socketRef.current = socket;

    socket.on("message:received", (rawMsg) => {
      const msg = normalizeMessage(rawMsg);
      if (!msg) return;

      // append if it belongs to current chat
      const curChatId = selectedChat && (selectedChat._id || selectedChat);
      if (msg.chatId && String(msg.chatId) === String(curChatId)) {
        setMessages((prev) => [...prev, msg]);
      }
      // refresh chat list preview (you may call refreshChats)
      refreshChats();
    });

    socket.on("message:typing", ({ chatId, userId, isTyping }) => {
      // optionally: show typing indicator if for selected chat
      if (
        selectedChat &&
        (chatId === selectedChat || chatId === selectedChat._id)
      ) {
        setIsTyping(isTyping);
      }
    });

    // when a user becomes online
    socket.on("user:online", ({ userId } = {}) => {
      // server may emit { userId } or just userId; support both
      const id = userId !== undefined ? userId : arguments[0];
      setOnlineUsers((prev) => {
        const next = new Set(prev);
        next.add(String(id));
        return next;
      });
      // remove lastSeen when user comes online
      setLastSeenMap((prev) => {
        const copy = { ...prev };
        if (copy[String(id)]) delete copy[String(id)];
        return copy;
      });
    });

    // when a user goes offline
    socket.on("user:offline", ({ userId } = {}) => {
      const id = userId !== undefined ? userId : arguments[0];
      setOnlineUsers((prev) => {
        const next = new Set(prev);
        next.delete(String(id));
        return next;
      });
      // mark last seen now (ms)
      setLastSeenMap((prev) => ({ ...prev, [String(id)]: Date.now() }));
    });

    // cleanup socket listeners on unmount
    return () => {
      if (socket) {
        socket.off("message:received");
        socket.off("message:typing");
        socket.off("user:online");
        socket.off("user:offline");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [selectedChat]);
  }, []);

  // load chats on mount
  useEffect(() => {
    refreshChats();
  }, []);

  // auto-select chat id set by creation helpers
  useEffect(() => {
    const pending = localStorage.getItem("stoic_select_chat");
    if (pending) {
      localStorage.removeItem("stoic_select_chat");
      // if chats already loaded, select; otherwise wait a short moment and then select
      setTimeout(() => {
        handleSelectChat(pending);
      }, 250);
    }
    // expose refresh for other components
    window.__refreshChats = refreshChats;
    return () => {
      window.__refreshChats = null;
    };
  }, []); // run once on mount

  useEffect(() => {
    const handler = (e) => {
      try {
        const chatId = (e && e.detail && e.detail.chatId) || e;
        if (!chatId) return;
        // try to find in existing lists
        const foundGroup = groupChats.find(
          (g) => String(g.id) === String(chatId)
        );
        const foundPrivate = privateChats.find(
          (p) => String(p.id) === String(chatId)
        );
        if (foundGroup) setChatListTab("groups");
        else if (foundPrivate) setChatListTab("private");
        // show chat window on mobile
        if (window.innerWidth <= 1024) {
          setShowChatWindow(true);
        }
        // select chat
        setTimeout(() => handleSelectChat(chatId), 50);
      } catch (err) {
        console.error("openChat handler error", err);
      }
    };

    window.addEventListener("openChat", handler);
    return () => window.removeEventListener("openChat", handler);
  }, [groupChats, privateChats]); // depend on lists so it can decide tab if lists change

  // helper: fetch chats and split into group/private arrays, normalizing
  const refreshChats = async () => {
    try {
      const chats = await chatService.listChats();
      // normalize into UI-friendly objects
      const groups = [];
      const privates = [];
      const currentUserId = JSON.parse(
        localStorage.getItem("loggedInUser")
      )?._id;

      (chats || []).forEach((c) => {
        const id = c._id || c.id || "";
        const type = c.type || "private";
        // lastMessage may be populated as object (lastMessageId) or null
        const lastMsg = c.lastMessageId
          ? c.lastMessageId.content || c.lastMessageId
          : "";

        const time = c.lastMessageId
          ? new Date(c.lastMessageId.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : "";
        const unread = c.unread || 0;

        let name = c.name || null;

        if (!name) {
          if (type === "private") {
            // try to find the other participant and get their display name
            const other = (c.participants || []).find((p) => {
              const pid = typeof p === "object" ? p._id || p.id : p;
              return String(pid) !== String(currentUserId);
            });
            const disp = participantDisplay(other);
            name =
              disp ||
              (other && typeof other === "string"
                ? `User ${String(other).slice(0, 6)}`
                : "Chat");
          } else if (type === "group") {
            // for groups without name, make a fallback from participants
            const names = (c.participants || [])
              .map(participantDisplay)
              .filter(Boolean)
              .slice(0, 3);
            name = names.length ? names.join(", ") : "Group";
          }
        }

        const item = {
          id,
          name,
          lastMessage: lastMsg,
          time,
          unread,
          raw: c,
        };

        if (type === "group") groups.push(item);
        else privates.push(item);
      });

      // update state
      setGroupChats(groups);
      setPrivateChats(privates);

      // If there is a pending chat id (from search/create), auto-select & set tab
      const pending = localStorage.getItem("stoic_select_chat");
      if (pending) {
        // remove it so it doesn't trigger repeatedly
        localStorage.removeItem("stoic_select_chat");

        // decide which tab contains this chat
        const inGroups = groups.find((g) => String(g.id) === String(pending));
        const inPrivates = privates.find(
          (p) => String(p.id) === String(pending)
        );

        if (inGroups) {
          setChatListTab("groups");
        } else if (inPrivates) {
          setChatListTab("private");
        }

        // now select the chat (will load messages)
        // slight delay to ensure UI updates; but handleSelectChat handles string IDs as well
        setTimeout(() => handleSelectChat(pending), 50);
        return;
      }

      // if no pending selection and nothing selected yet, pick first available
      if (!selectedChat) {
        const pick = groups[0] || privates[0];
        if (pick) handleSelectChat(pick.id);
      }
    } catch (err) {
      console.error("Failed to load chats", err);
    }
  };

  // when a chat is selected: load messages
  const handleSelectChat = async (chatId) => {
    // find raw chat object (if exists)
    const rawChat = [...groupChats, ...privateChats].find(
      (c) => c.id === chatId
    )?.raw;
    setSelectedChat(rawChat || chatId);
    if (isMobile) setShowChatWindow(true);

    try {
      // const msgs = await messageService.getMessages(chatId, 0, 50);
      // // server returns newest-first; reverse for older->newer rendering
      // const ordered = Array.isArray(msgs) ? msgs.slice().reverse() : [];
      // setMessages(ordered);

      // new:
      const msgs = await messageService.getMessages(chatId, 0, 50);
      const normalized = (Array.isArray(msgs) ? msgs : []).map(
        normalizeMessage
      );
      // server returned newest-first, so reverse to show oldest->newest
      const ordered = normalized.slice().reverse();
      setMessages(ordered);
      console.log("normal-> ", ordered);
    } catch (err) {
      console.error("Failed to load messages", err);
      setMessages([]);
    }
  };

  // sending message: emit over socket (server saves & broadcasts)
  const handleSendMessage = (e) => {
    e.preventDefault();
    const content = message?.trim();
    if (!content) return;
    const socket = socketRef.current || getSocket();
    if (socket && socket.connected) {
      const payload = {
        chatId: selectedChat._id || selectedChat,
        content,
        messageType: "text",
      };
      socket.emit("message:send", payload);
      // optimistic UI append
      const userId = JSON.parse(localStorage.getItem("loggedInUser"))?._id;
      const optimistic = {
        chatId: payload.chatId,
        senderId: userId,
        content,
        messageType: "text",
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, optimistic]);
      setMessage("");
    } else {
      // fallback to REST send if socket unavailable
      messageService
        .sendMessageRest({ chatId: selectedChat._id || selectedChat, content })
        .then((saved) => {
          setMessages((prev) => [...prev, saved]);
          setMessage("");
          refreshChats();
        })
        .catch((err) => console.error(err));
    }
  };

  // compute otherUserId given currentChat (helper)
  const getOtherParticipantId = (chat) => {
    if (!chat) return null;
    if (chat.type === "group") return null;
    if (Array.isArray(chat.participants)) {
      const me = JSON.parse(localStorage.getItem("loggedInUser") || "null");
      const myId = me?._id || me?.id;
      for (let p of chat.participants) {
        // p can be object or id string
        const pid = typeof p === "object" ? p._id || p.id : p;
        if (!myId || String(pid) !== String(myId)) return pid;
      }
    }
    return null;
  };

  // when rendering ChatHeader
  const otherId = getOtherParticipantId(selectedChat);

  return (
    <div className="d-flex min-vh-100 bg-light">
      {isMobile ? (
        showChatWindow ? (
          <ChatWindow
            currentChat={selectedChat || {}}
            messages={messages}
            message={message}
            setMessage={setMessage}
            isTyping={isTyping}
            handleSendMessage={handleSendMessage}
            onBack={() => setShowChatWindow(false)}
            isMobile={isMobile}
            isOnline={otherId ? onlineUsers.has(String(otherId)) : false}
            lastSeen={otherId ? lastSeenMap[String(otherId)] : null}
          />
        ) : (
          <ChatList
            activeTab={chatListTab}
            setActiveTab={setChatListTab}
            selectedChat={selectedChat?._id || selectedChat}
            setSelectedChat={handleSelectChat}
            groupChats={groupChats}
            privateChats={privateChats}
          />
        )
      ) : (
        <>
          <ChatList
            activeTab={chatListTab}
            setActiveTab={setChatListTab}
            selectedChat={selectedChat?._id || selectedChat}
            setSelectedChat={handleSelectChat}
            groupChats={groupChats}
            privateChats={privateChats}
          />
          <ChatWindow
            currentChat={selectedChat || {}}
            messages={messages}
            message={message}
            setMessage={setMessage}
            isTyping={isTyping}
            handleSendMessage={handleSendMessage}
            isMobile={isMobile}
            isOnline={otherId ? onlineUsers.has(String(otherId)) : false}
            lastSeen={otherId ? lastSeenMap[String(otherId)] : null}
          />
        </>
      )}
    </div>
  );
}

// helper to normalize a message from backend -> UI-friendly shape
const normalizeMessage = (rawMsg) => {
  if (!rawMsg) return null;
  console.log(rawMsg);

  // backend fields may be: _id, chatId, senderId (object or id), content, messageType, attachments, createdAt
  // sometimes sender info is populated as senderId.name; handle both
  const id = rawMsg._id || rawMsg.id || String(Math.random()).slice(2);
  const text = rawMsg.content ?? rawMsg.text ?? "";
  const createdAt =
    rawMsg.createdAt || rawMsg.created_at || rawMsg.created || null;
  //const time = createdAt ? new Date(createdAt).toLocaleTimeString() : "";

  const time = createdAt
    ? new Date(createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "";

  // sender could be populated object or id string
  const sender = rawMsg.senderId || rawMsg.sender || rawMsg.from || null;

  const senderId =
    typeof sender === "object" && sender?._id
      ? sender._id
      : typeof sender === "string"
      ? sender
      : sender?._id;
  const senderName =
    typeof sender === "object" && (sender.name || sender.fullName)
      ? sender.name || sender.fullName
      : rawMsg.senderName || rawMsg.user || "Unknown";

  const currentUser = JSON.parse(
    localStorage.getItem("loggedInUser") || "null"
  );
  const currentUserId = currentUser?._id || currentUser?.id || null;

  const isOwn =
    senderId && currentUserId
      ? String(senderId) === String(currentUserId)
      : !!rawMsg.isOwn;

  return {
    id,
    text,
    user: senderName,
    senderId,
    chatId: rawMsg.chatId || rawMsg.room || null,
    time,
    createdAt,
    isOwn,
    // keep original for reference
    _raw: rawMsg,
  };
};
