import React from "react";
import MessageItem from "./MessageItem";
import TypingIndicator from "./TypingIndicator";

export default function MessageList({ messages, isTyping }) {
  return (
    <div className="flex-grow-1 overflow-auto p-3">
      {messages.map((msg, i) => (
        <MessageItem key={msg.id} msg={msg} index={i} />
      ))}
      {isTyping && <TypingIndicator />}
    </div>
  );
}
