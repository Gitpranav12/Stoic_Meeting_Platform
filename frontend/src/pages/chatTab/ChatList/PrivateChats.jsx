import React from "react";
import { motion } from "framer-motion";
import { Badge } from "react-bootstrap";

export default function PrivateChats({ privateChats, selectedChat, setSelectedChat }) {
  return (
    <div className="p-3">
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
              <p className="text-muted small mb-0">{chat.lastMessage}</p>
            </div>
            {chat.unread > 0 && (
              <Badge bg="danger" pill>
                {chat.unread}
              </Badge>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
