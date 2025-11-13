// 📁 src/pages/dashboard/components/RecentMessageItem.jsx
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "react-bootstrap";

export default function RecentChatMsgItem({ msg, onOpenChat }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="d-flex align-items-start justify-content-between border rounded p-3 mb-3"
      onClick={() => onOpenChat(msg.id)}
      style={{ cursor: "pointer" }}
    >
      {/* Avatar */}
      <div
        className="bg-secondary text-white rounded-circle d-flex justify-content-center align-items-center me-3"
        style={{ width: "40px", height: "40px" }}
      >
        {msg.from
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>

      {/* Content */}
      <div className="flex-grow-1">
        <div className="d-flex justify-content-between align-items-center">
          <strong>{msg.from}</strong>

          {/* Time + Badge container */}
          <div className="d-flex align-items-center gap-2">
            <small className="text-muted">{msg.time}</small>

            {msg.unread > 0 && (
              <Badge bg="danger" pill>
                {msg.unread}
              </Badge>
            )}
          </div>
        </div>

        <p className="text-muted small mb-0 text-truncate">{msg.message}</p>
      </div>
    </motion.div>
  );
}
