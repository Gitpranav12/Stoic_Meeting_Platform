import React from "react";
import { motion } from "framer-motion";

export default function IncomingMessage({ msg, index }) {
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
        {msg.user
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>

      {/* RIGHT SIDE: Bubble */}
      <div className="ms-2" style={{ maxWidth: "75%" }}>
        {/* Username */}
        <small className="text-muted d-block mb-1">{msg.user}</small>

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
          {msg.text}
        </div>

        {/* Time */}
        <small className="text-muted d-block mt-1">{msg.time}</small>
      </div>
    </motion.div>
  );
}
