import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./VideoSection.css";

const VideoSection = () => {
  const [participants, setParticipants] = useState([]);

  // Load or initialize participants
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("meet_participants"));

    if (savedData && savedData.length) {
      setParticipants(savedData);
    } else {
      const demoData = [
        { id: 1, name: "Ananya", role: "Host", initials: "AN", color: "linear-gradient(135deg,#a4508b,#5f0a87)" },
        { id: 2, name: "Arjun", role: "Co-host", initials: "AR", color: "linear-gradient(135deg,#ff416c,#ff4b2b)" },
        { id: 3, name: "Priya", role: "Participant", initials: "PR", color: "linear-gradient(135deg,#11998e,#38ef7d)" },
        { id: 4, name: "Rakesh", role: "Participant", initials: "RA", color: "linear-gradient(135deg,#00b4db,#0083b0)" },
        { id: 5, name: "Kiran", role: "Participant", initials: "KI", color: "linear-gradient(135deg,#ff9a9e,#fad0c4)" },
      ];
      localStorage.setItem("meet_participants", JSON.stringify(demoData));
      setParticipants(demoData);
    }
  }, []);

  // Randomly pick a speaker for demo
  const [activeSpeaker, setActiveSpeaker] = useState(null);
  useEffect(() => {
    const interval = setInterval(() => {
      if (participants.length > 0) {
        const random = participants[Math.floor(Math.random() * participants.length)];
        setActiveSpeaker(random.id);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [participants]);

  return (
    <div className="video-section container-fluid py-3">
      <div className="row g-3 justify-content-center">
        {participants.map((user) => (
          <div key={user.id} className="col-6 col-md-4 col-lg-3">
            <div
              className={`rounded position-relative d-flex flex-column justify-content-center align-items-center text-white shadow ${
                activeSpeaker === user.id ? "border border-3 border-success" : ""
              }`}
              style={{
                height: "200px",
                background: user.color,
                transition: "all 0.3s ease",
              }}
            >
              <div className="fs-3 fw-bold">{user.initials}</div>
              <div className="mt-2 small">{user.name}</div>
              <span
                className={`badge ${
                  user.role === "Host"
                    ? "bg-primary"
                    : user.role === "Co-host"
                    ? "bg-success"
                    : "bg-secondary"
                } position-absolute top-0 end-0 m-2`}
              >
                {user.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoSection;
