import React from "react";
import { Clock, Users, Star, Scissors, Home, Plus, Copy } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MeetingEndPage() {
  const meetingId = "meeting-dmaf03zca";

  const copyMeetingId = () => {
    navigator.clipboard.writeText(meetingId);
    alert("Meeting ID copied to clipboard!");
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5 px-3">
      <div
        className="card border-0 shadow-lg rounded-4 overflow-hidden"
        style={{ maxWidth: "520px", width: "100%" }}
      >
        {/* Gradient Header */}
        <div
          className="text-center text-white py-5"
          style={{
            background: "linear-gradient(135deg, #a855f7, #7e22ce)",
            borderBottomLeftRadius: "40px",
            borderBottomRightRadius: "40px",
          }}
        >
          <div className="d-flex justify-content-center align-items-center mb-3">
            <Scissors size={48} />
          </div>
          <h3 className="fw-semibold mb-1">Call Ended</h3>
          <p className="text-white-50 mb-0">You have left the meeting</p>
        </div>

        {/* Meeting Info */}
        <div className="card-body bg-white text-center p-4">
          <div className="d-flex justify-content-around text-center mb-4">
            <div>
              <Clock size={28} className="text-secondary mb-2" />
              <p className="mb-0 text-muted small">Duration</p>
              <h6 className="fw-semibold">3m 3s</h6>
            </div>
            <div>
              <Users size={28} className="text-secondary mb-2" />
              <p className="mb-0 text-muted small">Participants</p>
              <h6 className="fw-semibold">134</h6>
            </div>
            <div>
              <Star size={28} className="text-secondary mb-2" />
              <p className="mb-0 text-muted small">Quality</p>
              <h6 className="fw-semibold">HD</h6>
            </div>
          </div>

          {/* Meeting ID Box */}
          <div className="bg-light rounded-3 p-3 mb-4 d-flex justify-content-between align-items-center">
            <div>
              <p className="text-muted mb-1 small">Meeting ID</p>
              <span className="text-purple fw-semibold text-lowercase">
                {meetingId}
              </span>
            </div>
            <button
              onClick={copyMeetingId}
              className="btn btn-light border-0 text-purple"
            >
              <Copy size={18} />
              <span className="ms-1">Copy</span>
            </button>
          </div>

          {/* Buttons */}
          <div className="d-grid gap-2">
            <button
              className="btn text-white fw-semibold py-3"
              style={{
                background: "linear-gradient(135deg, #a855f7, #7e22ce)",
              }}
            >
              <Scissors size={20} className="me-2" />
              Rejoin Meeting
            </button>

            <div className="d-flex gap-2 mt-2">
              <button className="btn btn-outline-secondary w-50 py-2 fw-semibold">
                <Plus size={18} className="me-2" />
                New Meeting
              </button>
              <button className="btn btn-outline-secondary w-50 py-2 fw-semibold">
                <Home size={18} className="me-2" />
                Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
