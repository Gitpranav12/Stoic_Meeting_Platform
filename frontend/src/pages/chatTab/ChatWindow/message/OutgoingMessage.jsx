import React from "react";
import { motion } from "framer-motion";

export default function OutgoingMessage({ msg, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="d-flex mb-3 justify-content-end px-2"
    >
      <div
        className="d-flex flex-column align-items-end"
        style={{ maxWidth: "75%" }}
      >
        {/* Bubble */}
        <div
          className="px-3 py-2 bg-primary text-white"
          style={{
            borderRadius: "16px 16px 4px 16px", // 👈 nicer modern bubble
            wordBreak: "break-word",
            lineHeight: "1.4",
            fontSize: "0.95rem",
          }}
        >
          {msg.text}
        </div>

        {/* Time */}
        <small className="text-muted mt-1">{msg.time}</small>
      </div>
    </motion.div>
  );
}
