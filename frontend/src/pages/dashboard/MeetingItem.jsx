// 📁 src/pages/dashboard/components/MeetingItem.jsx
import React from "react";
import { motion } from "framer-motion";
import { Button, Badge } from "react-bootstrap";
import { Clock, Users } from "lucide-react";

export default function MeetingItem({ meeting, onJoin }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="d-flex justify-content-between align-items-center border rounded p-3 mb-3"
    >
      <div>
        <h6 className="mb-1">{meeting.title}</h6>

        <div className="d-flex align-items-center gap-3 text-muted small">
          <span>
            <Clock size={14} /> {meeting.time}
          </span>
          <span>
            <Users size={14} /> {meeting.participants}
          </span>
          <Badge bg="secondary">{meeting.date}</Badge>
        </div>
      </div>

      <Button size="sm" onClick={() => onJoin(meeting.id)}>
        Join
      </Button>
    </motion.div>
  );
}
