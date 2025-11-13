import React from "react";
import { motion } from "framer-motion";

export default function MessageItem({ msg, index }) {
  return (
    <motion.div
      key={msg.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`d-flex mb-3 ${msg.isOwn ? "justify-content-end" : ""}`}
    >
      <div
        className={`d-flex ${msg.isOwn ? "flex-row-reverse" : ""} gap-2`}
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
            <small className="text-muted d-block mb-1">{msg.user}</small>
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
  );
}
