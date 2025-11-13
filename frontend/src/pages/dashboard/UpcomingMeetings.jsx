// 📁 src/pages/dashboard/components/UpcomingMeetings.jsx
import React from "react";
import { motion } from "framer-motion";
import { Card, Button, Badge } from "react-bootstrap";
import { Clock, Users } from "lucide-react";

export default function UpcomingMeetings({ meetings = [], onJoin }) {
  return (
    <Card className="card-p">
      <Card.Header className="card-header-p">
        <h6 className="mb-0">Upcoming Meetings</h6>
        <small className="text-muted">Your scheduled meetings</small>
      </Card.Header>
      <Card.Body>
        {meetings.map((meeting) => (
          <motion.div
            key={meeting.id}
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
        ))}
      </Card.Body>
    </Card>
  );
}
