import React, { useState } from "react";
import WaitingRoom from "../components/WaitingRoom";

export default function MeetingPage() {
  // This state simulates: Meeting NOT started yet
  // In real use, you will fetch/check this status from backend
  const [meetingStarted] = useState(false);

  // These are example meeting details; customize later based on real meeting data
  const meeting = {
    title: "Team Standup",
    host: "John Doe",
    description: "Daily sync-up meeting."
  };

  // Always show waiting room until you implement actual start/join logic
  if (!meetingStarted) {
    return (
      <WaitingRoom
        meetingTitle={meeting.title}
        hostName={meeting.host}
        description={meeting.description}
      />
    );
  }

  // Here, render your actual meeting UI once meetingStarted becomes true
  return (
    <div>
      <h2>Meeting Started</h2>
      {/* Meeting participants, video stream, etc. */}
    </div>
  );
}
