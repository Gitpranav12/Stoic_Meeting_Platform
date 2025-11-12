import React, { useState, useEffect } from "react";

const HeaderTitle = () => {
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingId, setMeetingId] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const storedTitle = localStorage.getItem("meetingTitle") || "Team Meeting";
    const storedId = localStorage.getItem("meetingId") || "123-456-789";
    setMeetingTitle(storedTitle);
    setMeetingId(storedId);
  }, []);

  // Update localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("meetingTitle", meetingTitle);
    localStorage.setItem("meetingId", meetingId);
  }, [meetingTitle, meetingId]);

  return (
    <div>
      <h5 className="mb-0 text-dark">{meetingTitle}</h5>
      <small className="text-secondary">Meeting ID: {meetingId}</small>
    </div>
  );
};

export default HeaderTitle;
