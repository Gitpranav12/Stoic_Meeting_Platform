// 📁 src/pages/dashboard/components/RecentMessages.jsx
import React from "react";
import { Card } from "react-bootstrap";
import RecentChatMsgItem from "./RecentChatMsgItem";

export default function RecentMessages({ messages = [], onOpenChat }) {
  return (
    <Card className="card-p">
      <Card.Header className="card-header-p">
        <h6 className="mb-0">Recent Messages</h6>
        <small className="text-muted">Latest conversations</small>
      </Card.Header>

      <Card.Body>
        {messages.map(msg => (
          <RecentChatMsgItem 
            key={msg.id} 
            msg={msg} 
            onOpenChat={onOpenChat} 
          />
        ))}
      </Card.Body>
    </Card>
  );
}
