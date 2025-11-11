import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Video,
  MessageSquare,
  Settings,
  LogOut,
  Search,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
} from "lucide-react";
import { Button, Form, InputGroup, Badge, Nav, Tab } from "react-bootstrap";
import Sidebar from "../../common/Sidebar"; // optional reuse of your Sidebar component

//export default function ChatDashboard({ active = "chat", onNavigate, onLogout }) {
export default function ChatDashboard({ active = "chat" }) {
  const [selectedChat, setSelectedChat] = useState("team-alpha");
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const groupChats = [
    {
      id: "team-alpha",
      name: "Team Alpha",
      lastMessage: "Great work on the presentation!",
      time: "2h ago",
      unread: 3,
    },
    {
      id: "design-team",
      name: "Design Team",
      lastMessage: "Updated mockups shared",
      time: "4h ago",
      unread: 0,
    },
    {
      id: "all-hands",
      name: "All Hands",
      lastMessage: "Meeting at 3 PM",
      time: "1d ago",
      unread: 1,
    },
  ];

  const privateChats = [
    {
      id: "sarah",
      name: "Sarah Johnson",
      lastMessage: "Can we reschedule?",
      time: "5m ago",
      unread: 2,
    },
    {
      id: "mike",
      name: "Mike Chen",
      lastMessage: "Thanks for the update!",
      time: "1h ago",
      unread: 0,
    },
    {
      id: "alex",
      name: "Alex Rivera",
      lastMessage: "See you tomorrow",
      time: "3h ago",
      unread: 0,
    },
  ];

  const chatMessages = {
    "team-alpha": [
      {
        id: 1,
        user: "Sarah Johnson",
        text: "Hey everyone! Ready for the presentation?",
        time: "10:00 AM",
        isOwn: false,
      },
      {
        id: 2,
        user: "Mike Chen",
        text: "Yes, all set! The slides look great.",
        time: "10:02 AM",
        isOwn: false,
      },
      {
        id: 3,
        user: "You",
        text: "Thanks! I added the final metrics.",
        time: "10:05 AM",
        isOwn: true,
      },
      {
        id: 4,
        user: "Alex Rivera",
        text: "Perfect timing. Client is joining in 10 mins.",
        time: "10:08 AM",
        isOwn: false,
      },
      {
        id: 5,
        user: "Sarah Johnson",
        text: "Great work on the presentation! 🎉",
        time: "11:30 AM",
        isOwn: false,
      },
    ],
    sarah: [
      {
        id: 1,
        user: "Sarah Johnson",
        text: "Hi! Do you have a moment?",
        time: "9:00 AM",
        isOwn: false,
      },
      {
        id: 2,
        user: "You",
        text: "Sure! What's up?",
        time: "9:02 AM",
        isOwn: true,
      },
      {
        id: 3,
        user: "Sarah Johnson",
        text: "Can we reschedule the meeting?",
        time: "9:05 AM",
        isOwn: false,
      },
    ],
  };

  const currentMessages =
    chatMessages[selectedChat] || chatMessages["team-alpha"];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessage("");
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* ✅ Sidebar Component */}
      {/* <Sidebar onNavigate={onNavigate} onLogout={onLogout} active={active} /> */}
      <Sidebar active={active} />

      {/* Chat List */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white border-end flex-shrink-0"
        style={{ width: "320px" }}
      >
        <div className="p-3 border-bottom">
          <InputGroup>
            <InputGroup.Text>
              <Search size={16} />
            </InputGroup.Text>
            <Form.Control placeholder="Search messages..." />
          </InputGroup>
        </div>

        <Tab.Container defaultActiveKey="groups">
          <Nav variant="tabs" className="px-3">
            <Nav.Item>
              <Nav.Link eventKey="groups">Group Chat</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="private">Private Chat</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content
            className="overflow-auto"
            style={{ height: "calc(100vh - 150px)" }}
          >
            {/* Group Chats */}
            <Tab.Pane eventKey="groups" className="p-3">
              {groupChats.map((chat) => (
                <motion.div
                  key={chat.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`p-3 rounded mb-2 border ${
                    selectedChat === chat.id
                      ? "border-primary bg-primary-subtle"
                      : "border-light bg-white"
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex align-items-start">
                    <div
                      className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center me-3"
                      style={{ width: "36px", height: "36px" }}
                    >
                      {chat.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between">
                        <strong>{chat.name}</strong>
                        <small className="text-muted">{chat.time}</small>
                      </div>
                      <p className="text-muted small mb-0">
                        {chat.lastMessage}
                      </p>
                    </div>
                    {chat.unread > 0 && (
                      <Badge bg="danger" pill>
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </motion.div>
              ))}
            </Tab.Pane>

            {/* Private Chats */}
            <Tab.Pane eventKey="private" className="p-3">
              {privateChats.map((chat) => (
                <motion.div
                  key={chat.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`p-3 rounded mb-2 border ${
                    selectedChat === chat.id
                      ? "border-primary bg-primary-subtle"
                      : "border-light bg-white"
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex align-items-start">
                    <div
                      className="bg-secondary text-white rounded-circle d-flex justify-content-center align-items-center me-3"
                      style={{ width: "36px", height: "36px" }}
                    >
                      {chat.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between">
                        <strong>{chat.name}</strong>
                        <small className="text-muted">{chat.time}</small>
                      </div>
                      <p className="text-muted small mb-0">
                        {chat.lastMessage}
                      </p>
                    </div>
                    {chat.unread > 0 && (
                      <Badge bg="danger" pill>
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </motion.div>
              ))}
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </motion.div>

      {/* Chat Window */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white border-bottom p-3 d-flex justify-content-between align-items-center"
        >
          <div className="d-flex align-items-center gap-3">
            <div
              className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
              style={{ width: "36px", height: "36px" }}
            >
              TA
            </div>
            <div>
              <h6 className="mb-0">Team Alpha</h6>
              <small className="text-muted">6 members</small>
            </div>
          </div>
          <div className="d-flex gap-2">
            <Button
              variant="outline-primary"
              // onClick={() => onNavigate("meeting")}
            >
              <Video size={16} className="me-2" /> Start Call
            </Button>
            <Button variant="light">
              <MoreVertical size={18} />
            </Button>
          </div>
        </motion.div>

        {/* Messages */}
        <div className="flex-grow-1 overflow-auto p-3">
          {currentMessages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`d-flex mb-3 ${
                msg.isOwn ? "justify-content-end" : ""
              }`}
            >
              <div
                className={`d-flex ${
                  msg.isOwn ? "flex-row-reverse" : ""
                } gap-2`}
                style={{ maxWidth: "70%" }}
              >
                {!msg.isOwn && (
                  <div
                    className="bg-secondary text-white rounded-circle d-flex justify-content-center align-items-center"
                    style={{ width: "32px", height: "32px" }}
                  >
                    {msg.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
                <div>
                  {!msg.isOwn && (
                    <small className="text-muted d-block mb-1">
                      {msg.user}
                    </small>
                  )}
                  <div
                    className={`rounded px-3 py-2 ${
                      msg.isOwn ? "bg-primary text-white" : "bg-light text-dark"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <small
                    className={`text-muted mt-1 d-block ${
                      msg.isOwn ? "text-end" : ""
                    }`}
                  >
                    {msg.time}
                  </small>
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="d-flex align-items-center gap-2"
            >
              <div
                className="bg-secondary text-white rounded-circle d-flex justify-content-center align-items-center"
                style={{ width: "32px", height: "32px" }}
              >
                SJ
              </div>
              <div className="bg-light rounded px-3 py-2 d-flex gap-1">
                <motion.div
                  className="bg-secondary rounded-circle"
                  style={{ width: 6, height: 6 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                />
                <motion.div
                  className="bg-secondary rounded-circle"
                  style={{ width: 6, height: 6 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                />
                <motion.div
                  className="bg-secondary rounded-circle"
                  style={{ width: 6, height: 6 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Input */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white border-top p-3"
        >
          <Form
            onSubmit={handleSendMessage}
            className="d-flex align-items-center gap-2"
          >
            <Button variant="light" type="button">
              <Paperclip size={18} />
            </Button>
            <Form.Control
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <Button variant="light" type="button">
              <Smile size={18} />
            </Button>
            <Button variant="primary" type="submit">
              <Send size={18} />
            </Button>
          </Form>
        </motion.div>
      </div>
    </div>
  );
}
