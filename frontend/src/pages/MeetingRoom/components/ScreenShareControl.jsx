import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ScreenShareControl = () => {
  const [sharing, setSharing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Start screen sharing
  const startScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setSharing(true);
      setShowPopup(false);
    } catch (err) {
      console.error("Error sharing screen:", err);
      alert("❌ Screen share cancelled or failed.");
    }
  };

  // Stop screen sharing
  const stopScreenShare = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setSharing(false);
  };

  return (
    <div>
      {/* Main button */}
      <button
        className="btn mx-2 d-flex justify-content-center align-items-center rounded-circle border-0"
        style={{
          width: "48px",
          height: "48px",
          backgroundColor: sharing ? "#d4edda" : "#f1f3f4",
        }}
        onClick={() => {
          if (sharing) stopScreenShare();
          else setShowPopup(true);
        }}
      >
        <i
          className={`bi ${
            sharing ? "bi-display text-success" : "bi-display text-dark"
          } fs-5`}
        ></i>
      </button>

      {/* Popup Modal */}
      {showPopup && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
          style={{ zIndex: 1050 }}
        >
          <div className="bg-white rounded shadow p-4 text-center" style={{ width: "350px" }}>
            <h5 className="mb-3">Share your screen</h5>
            <p className="text-muted small">
              Select what you want to share (screen/window/tab).
            </p>

            <div className="d-flex justify-content-around mt-3">
              <button className="btn btn-secondary" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
              <button className="btn btn-success" onClick={startScreenShare}>
                Start Sharing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview small video (like Google Meet mini view) */}
      {sharing && (
        <div
          className="position-fixed bottom-0 end-0 m-3 bg-dark rounded shadow"
          style={{ width: "250px", height: "150px", zIndex: 1040 }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-100 h-100 rounded"
            style={{ objectFit: "cover" }}
          ></video>
          <button
            className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1"
            onClick={stopScreenShare}
          >
            Stop
          </button>
        </div>
      )}
    </div>
  );
};

export default ScreenShareControl;
