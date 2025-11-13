import React from "react";
import { motion } from "framer-motion";

export default function TypingIndicator({ initials = "SJ" }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="d-flex align-items-center gap-2"
    >
      <div
        className="bg-secondary text-white rounded-circle d-flex justify-content-center align-items-center"
        style={{ width: "32px", height: "32px" }}
      >
        {initials}
      </div>
      <div className="bg-light rounded px-3 py-2 d-flex gap-1">
        {[0, 0.2, 0.4].map((delay, i) => (
          <motion.div
            key={i}
            className="bg-secondary rounded-circle"
            style={{ width: 6, height: 6 }}
            animate={{ y: [0, -5, 0] }}
            transition={{
              repeat: Infinity,
              duration: 0.6,
              delay,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
