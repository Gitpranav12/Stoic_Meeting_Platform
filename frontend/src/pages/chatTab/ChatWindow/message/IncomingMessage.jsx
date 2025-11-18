// src/pages/chatTab/ChatWindow/IncomingMessage.jsx
import React from "react";
import { motion } from "framer-motion";

export default function IncomingMessage({ msg, index }) {
  // make sure we have a display name
  const displayName = msg?.user || msg?.senderName || "Unknown";
  // compute initials safely
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const text = msg?.text ?? msg?.content ?? "";
  const time =
    msg?.time ||
    (msg?.createdAt ? new Date(msg.createdAt).toLocaleTimeString() : "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="d-flex mb-3"
    >
      {/* LEFT SIDE: Avatar */}
      <div
        className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center"
        style={{
          width: 36,
          height: 36,
          fontSize: 14,
          flexShrink: 0,
          marginTop: "4px",
        }}
      >
        {initials}
      </div>

      {/* RIGHT SIDE: Bubble */}
      <div className="ms-2" style={{ maxWidth: "75%" }}>
        {/* Username */}
        <small className="text-muted d-block mb-1">{displayName}</small>

        {/* Message bubble */}
        <div
          style={{
            background: "#f1f3f4",
            color: "#202124",
            padding: "10px 14px",
            borderRadius: "12px",
            borderTopLeftRadius: "4px",
            lineHeight: "1.4",
            fontSize: "0.95rem",
            wordBreak: "break-word",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          }}
        >
          {text}
        </div>

        {/* Time */}
        <small className="text-muted d-block mt-1">{time}</small>
      </div>
    </motion.div>
  );
}
