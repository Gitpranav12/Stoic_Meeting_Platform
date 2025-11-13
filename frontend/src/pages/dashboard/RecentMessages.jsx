// 📁 src/pages/dashboard/components/RecentMessages.jsx
import React from "react";
import { motion } from "framer-motion";
import { Card, Badge } from "react-bootstrap";

export default function RecentMessages({ messages = [], onOpenChat }) {
  return (
    <Card className="card-p">
      <Card.Header className="card-header-p">
        <h6 className="mb-0">Recent Messages</h6>
        <small className="text-muted">Latest conversations</small>
      </Card.Header>
      <Card.Body>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            whileHover={{ scale: 1.02 }}
            className="d-flex align-items-start border rounded p-3 mb-3"
            onClick={() => onOpenChat(msg.id)}
            style={{ cursor: "pointer" }}
          >
            <div
              className="bg-secondary text-white rounded-circle d-flex justify-content-center align-items-center me-3"
              style={{ width: "40px", height: "40px" }}
            >
              {msg.from
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between">
                <strong>{msg.from}</strong>
                <small className="text-muted">{msg.time}</small>
              </div>
              <p className="text-muted small mb-0">{msg.message}</p>
            </div>
            {msg.unread > 0 && (
              <Badge bg="danger" pill>
                {msg.unread}
              </Badge>
            )}
          </motion.div>
        ))}
      </Card.Body>
    </Card>
  );
}
