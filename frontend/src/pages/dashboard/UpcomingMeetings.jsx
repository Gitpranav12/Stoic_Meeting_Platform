// 📁 src/pages/dashboard/components/UpcomingMeetings.jsx
import React from "react";
import { Card } from "react-bootstrap";
import MeetingItem from "./MeetingItem";

export default function UpcomingMeetings({ meetings = [], onJoin }) {
  return (
    <Card className="card-p">
      <Card.Header className="card-header-p">
        <h6 className="mb-0">Upcoming Meetings</h6>
        <small className="text-muted">Your scheduled meetings</small>
      </Card.Header>

      <Card.Body>
        {meetings.map((m) => (
          <MeetingItem key={m.id} meeting={m} onJoin={onJoin} />
        ))}
      </Card.Body>
    </Card>
  );
}
