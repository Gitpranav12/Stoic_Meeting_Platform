import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderTitle from "../components/HeaderTitle";
import MeetingTimer from "../components/MeetingTimer";
import ParticipantCount from "../components/ParticipantCount";

const MeetingHeader = () => {
  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center p-2 px-md-4 mb-2 text-dark rounded-0">
      {/* 🔹 Left Side — Meeting Title */}
      <HeaderTitle />

      {/* 🔹 Right Side — Timer & Participants */}
      <div className="d-flex align-items-center gap-3 mt-2 mt-md-0">
        <MeetingTimer />
        <ParticipantCount />
      </div>
    </div>
  );
};

export default MeetingHeader;
