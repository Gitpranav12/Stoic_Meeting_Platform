import React, { useState, useEffect } from "react";
import ChatList from "./ChatList/ChatList";
import ChatWindow from "./ChatWindow/ChatWindow";

export default function ChatDashboard() {
  const [selectedChat, setSelectedChat] = useState("team-alpha");
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showChatWindow, setShowChatWindow] = useState(false);

  // ✅ Detect mobile view and update dynamically on resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setShowChatWindow(false); // reset state when returning to desktop
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

   // ✅ Data
  const groupChats = [
    { id: "team-alpha", name: "Team Alpha", lastMessage: "Great work on the presentation!", time: "2h ago", unread: 3 },
    { id: "design-team", name: "Design Team", lastMessage: "Updated mockups shared", time: "4h ago", unread: 0 },
    { id: "all-hands", name: "All Hands", lastMessage: "Meeting at 3 PM", time: "1d ago", unread: 1 },
  ];

  const privateChats = [
    { id: "sarah", name: "Sarah Johnson", lastMessage: "Can we reschedule?", time: "5m ago", unread: 2 },
    { id: "mike", name: "Mike Chen", lastMessage: "Thanks for the update!", time: "1h ago", unread: 0 },
    { id: "alex", name: "Alex Rivera", lastMessage: "See you tomorrow", time: "3h ago", unread: 0 },
  ];

  const chatMessages = {
    "team-alpha": [
      { id: 1, user: "Sarah Johnson", text: "Hey everyone! Ready for the presentation?", time: "10:00 AM", isOwn: false },
      { id: 2, user: "Mike Chen", text: "Yes, all set! The slides look great.", time: "10:02 AM", isOwn: false },
      { id: 3, user: "You", text: "Thanks! I added the final metrics.", time: "10:05 AM", isOwn: true },
         { id: 5, user: "Sarah Johnson", text: "Hey everyone! Ready for the presentation?", time: "10:00 AM", isOwn: false },
      { id: 6, user: "Mike Chen", text: "Yes, all set! The slides look great.", time: "10:02 AM", isOwn: false },
      { id: 7, user: "You", text: "Thanks! I added the final metrics.", time: "10:05 AM", isOwn: true },
          { id: 1, user: "Sarah Johnson", text: "Hey everyone! Ready for the presentation?", time: "10:00 AM", isOwn: false },
      { id: 2, user: "Mike Chen", text: "Yes, all set! The slides look great.", time: "10:02 AM", isOwn: false },
      { id: 3, user: "You", text: "Thanks! I added the final metrics.", time: "10:05 AM", isOwn: true },
         { id: 5, user: "Sarah Johnson", text: "Hey everyone! Ready for the presentation?", time: "10:00 AM", isOwn: false },
      { id: 6, user: "Mike Chen", text: "Yes, all set! The slides look great.", time: "10:02 AM", isOwn: false },
      { id: 7, user: "You", text: "Thanks! I added the final metrics.", time: "10:05 AM", isOwn: true },
    ],
    sarah: [
      { id: 1, user: "Sarah Johnson", text: "Hi! Do you have a moment?", time: "9:00 AM", isOwn: false },
      { id: 2, user: "You", text: "Sure! What's up?", time: "9:02 AM", isOwn: true },
      { id: 3, user: "Sarah Johnson", text: "Can we reschedule the meeting?", time: "9:05 AM", isOwn: false },
    ],
  };

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
          />
        </>
      )}
    </div>
  );
}
