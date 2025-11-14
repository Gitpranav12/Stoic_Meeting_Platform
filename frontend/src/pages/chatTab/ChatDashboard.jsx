import React, { useState, useEffect } from "react";
import ChatList from "./ChatList/ChatList";
import ChatWindow from "./ChatWindow/ChatWindow";

// 🆕 Import chat data
import { groupChats, privateChats, chatMessages } from "./data/chatData";

export default function ChatDashboard() {
  const [selectedChat, setSelectedChat] = useState("team-alpha");
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [showChatWindow, setShowChatWindow] = useState(false);

  // ✅ Detect mobile view and update dynamically on resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024; // updated breakpoint
      setIsMobile(mobile);
      if (!mobile) setShowChatWindow(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentMessages = chatMessages[selectedChat] || [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessage("");
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  // ✅ On mobile: when a chat is selected, navigate to ChatWindow
  const handleSelectChat = (chatId) => {
    setSelectedChat(chatId);
    if (isMobile) setShowChatWindow(true);
  };

  const currentChat =
    groupChats.find((c) => c.id === selectedChat) ||
    privateChats.find((c) => c.id === selectedChat) ||
    {};

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* 🧭 MOBILE: Show only ChatList or ChatWindow */}
      {isMobile ? (
        showChatWindow ? (
          <ChatWindow
            currentChat={currentChat}
            messages={currentMessages}
            message={message}
            setMessage={setMessage}
            isTyping={isTyping}
            handleSendMessage={handleSendMessage}
            // 👇 Add back button
            onBack={() => setShowChatWindow(false)}
            isMobile={isMobile}
          />
        ) : (
          <ChatList
            selectedChat={selectedChat}
            setSelectedChat={handleSelectChat}
            groupChats={groupChats}
            privateChats={privateChats}
          />
        )
      ) : (
        // 💻 DESKTOP: show both side by side
        <>
          <ChatList
            selectedChat={selectedChat}
            setSelectedChat={handleSelectChat}
            groupChats={groupChats}
            privateChats={privateChats}
          />
          <ChatWindow
            currentChat={currentChat}
            messages={currentMessages}
            message={message}
            setMessage={setMessage}
            isTyping={isTyping}
            handleSendMessage={handleSendMessage}
            isMobile={isMobile}
          />
        </>
      )}
    </div>
  );
}
