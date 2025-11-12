import React, { useState, useEffect } from "react";

const MeetingTimer = () => {
  const [seconds, setSeconds] = useState(() => {
    return Number(localStorage.getItem("meetingSeconds")) || 0;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        const newTime = prev + 1;
        localStorage.setItem("meetingSeconds", newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const formattedTime =
    hours > 0
      ? `${hours}h ${minutes}m`
      : `${minutes}m ${secs < 10 ? "0" : ""}${secs}s`;

  return (
    <div
      className="d-flex align-items-center bg-white px-3 py-2 rounded-pill shadow-sm border"
      style={{
        transition: "all 0.3s ease",
        cursor: "default",
        minWidth: "100px",
        justifyContent: "center",
      }}
      title="Meeting duration"
    >
      <span
        className="me-2"
        style={{
          color: "#34A853",
          fontSize: "10px",
          animation: "pulse 2s infinite",
        }}
      >
        ●
      </span>
      <span
        className="fw-semibold text-dark"
        style={{ fontSize: "14px", letterSpacing: "0.5px" }}
      >
        {formattedTime}
      </span>
    </div>
  );
};

export default MeetingTimer;
