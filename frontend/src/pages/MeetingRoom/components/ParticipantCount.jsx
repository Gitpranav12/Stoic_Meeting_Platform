import React, { useState, useEffect } from "react";

const ParticipantCount = () => {
  const [count, setCount] = useState(() => {
    return Number(localStorage.getItem("participantCount")) || 7;
  });

  // Update localStorage when count changes
  useEffect(() => {
    localStorage.setItem("participantCount", count);
  }, [count]);

  return (
    <div
      className="d-flex align-items-center text-dark bg-light px-3 py-1 rounded"
      style={{ cursor: "pointer" }}
      onClick={() => setCount(count + 1)} // click → add participant demo
    >
      <i className="bi bi-people text-dark me-1"></i> {count}
    </div>
  );
};

export default ParticipantCount;
