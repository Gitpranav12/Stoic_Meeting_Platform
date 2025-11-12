import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MeetingHeader from "./Pages/MeetingHeader";
import VideoSection from "./Pages/VideoSection";
import ControlBar from "./Pages/ControlBar";

const MeetingRoom = () => {
  return (
    <div className="container-fluid min-vh-100 bg-white text-dark d-flex flex-column p-0">
      
      {/* 🔹 Header - Fixed on top */}
      <header className="row g-0 fixed-top">
        <div className="col-12 mb-1">
          <div className=" border-bottom bg-light">
            <MeetingHeader />
          </div>
        </div>
      </header>

      {/* 🔹 Main Content (Video Section) */}
      <main className="row flex-grow-1 g-0 mt-5 mb-5">
        <div className="col-12 d-flex justify-content-center align-items-center bg-white">
          <VideoSection />
        </div>
      </main>

      {/* 🔹 Control Bar - Fixed Bottom */}
      <footer className="row g-0 fixed-bottom">
        <div className="col-12 mb-1">
          <div className="p-2 border-top bg-light">
            <ControlBar />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MeetingRoom;
