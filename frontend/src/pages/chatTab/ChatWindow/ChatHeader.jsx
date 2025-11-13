import React from "react";
import { motion } from "framer-motion";
import { Button, Dropdown } from "react-bootstrap";
import { Video, MoreVertical, ArrowLeft } from "lucide-react";

export default function ChatHeader({ currentChat, onBack }) {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white border-bottom p-3 d-flex justify-content-between align-items-center"
    >
      <div className="d-flex align-items-center gap-3">
        {/* 🔙 Mobile Back Button */}
        {onBack && (
          <Button
            variant="light"
            className="d-md-none p-2 border-0"
            onClick={onBack}
          >
            <ArrowLeft size={20} />
          </Button>
        )}

        <div
          className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
          style={{ width: "36px", height: "36px" }}
        >
          {currentChat.name
            ?.split(" ")
            .map((n) => n[0])
            .join("") || "?"}
        </div>
        <div>
          <h6 className="mb-0">{currentChat.name || "Chat"}</h6>
          <small className="text-muted">{currentChat.time || "—"}</small>
        </div>
      </div>

      {/* Actions */}
      <div className="d-flex gap-2 align-items-center">
        {/* ✅ Hide text on mobile, keep icon */}
        <Button variant="outline-primary" className="d-flex align-items-center">
          <Video size={16} className="me-0 me-md-2" />
          <span className="d-none d-md-inline">Start Call</span>
        </Button>

        <Dropdown align="end">
          <Dropdown.Toggle
            as={Button}
            bsPrefix="no-caret"
            variant="light"
            className="p-2 border-0"
            style={{ boxShadow: "none" }}
          >
            <MoreVertical size={18} />
          </Dropdown.Toggle>

          {/* <Dropdown.Menu>
            <Dropdown.Item>🔕 Mute Notifications</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>🧹 Clear Chat History</Dropdown.Item>
            <Dropdown.Item>🗑 Delete Conversation</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>📤 Export Chat</Dropdown.Item>
          </Dropdown.Menu> */}

        </Dropdown>
      </div>
    </motion.div>
  );
}
