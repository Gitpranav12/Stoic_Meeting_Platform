import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Users,Home, Plus, Copy } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; 
export default function MeetingEndPage() {
   const navigate = useNavigate();
  const meetingId = "meeting-dmaf03zca";

  const copyMeetingId = () => {
    navigator.clipboard.writeText(meetingId);
    alert("Meeting ID copied to clipboard!");
  };
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-3 px-3">
      <div
        className="card border-0 shadow-lg overflow-hidden"
        style={{
          maxWidth: "500px",
          width: "100%",
          borderRadius: "24px",
        }}
      >
        <div
          className="text-center text-white py-4"
          style={{
            background: "linear-gradient(135deg, #0066FF)",
            borderTopLeftRadius: "24px",
            borderTopRightRadius: "24px",
          }}
        >
          <div
            className="bg-white bg-opacity-25 rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
            style={{ width: "64px", height: "64px" }}
          >
            <i className="bi bi-telephone-x fs-3 text-white"></i>
          </div>
          <h5 className="mb-1" style={{ fontSize: "1.1rem" }}>
            Call Ended
          </h5>
          <p className="mb-0 small">You have left the meeting</p>
        </div>
        <div className="card-body bg-white text-center p-4">
          <div className="d-flex justify-content-around text-center mb-4">
            <div>
              <div
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2"
                style={{
                 width: "40px",
                  height: "40px",
                  backgroundColor: "#f3e8ff",
                }}
              >
                <Clock size={24} style={{ color: "#0066FF" }} />
              </div>
              <p className="mb-0 text-muted small">Duration</p>
              <p className=" small">3m 3s</p>
            </div>
            <div>
              <div
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2"
                style={{
                 width: "40px",
                  height: "40px",
                  backgroundColor: "#f3e8ff",
                }}
              >
                <Users size={24} style={{ color: "#0066FF" }} />
              </div>
              <p className="mb-0 text-muted small">Participants</p>
              <p className="small">134</p>
            </div>
            <div>
              <div
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#f3e8ff",
                }}
              >
        <i className="bi bi-stars" style={{ fontSize: "1.5rem", color: "#0066FF" }}></i>
            </div>
            <p className="mb-0 text-muted small">Quality</p>
            <p className="small">HD</p>
          </div>
        </div>
       <div
  className="rounded-3 p-3 mb-4 d-flex justify-content-between align-items-center"
  style={{ backgroundColor: "#f7f4f9ff" }} 
>
  <div>
    <p className="mb-1" style={{ color: "#0066FF", fontSize: "0.9rem" }}>
      Meeting ID
    </p>
    <span
      className="fw-semibold text-lowercase"
      style={{ color: "#0066FF", fontSize: "0.95rem" }}
    >
      {meetingId}
    </span>
  </div>
  <button
    onClick={copyMeetingId}
    className="btn btn-light border-0 d-flex align-items-center fw-semibold"
    style={{ color: "#0066FF",fontSize:"14px" }}
  >
    <Copy size={14} className="me-1" />
    Copy
  </button>
</div>
     <div className="d-grid gap-2 mx-3 mb-4">
  <button
    className="btn text-white py-1 fw-semibold d-flex align-items-center justify-content-center"
    style={{
      background: "linear-gradient(135deg,#0066FF)",
      borderRadius: "8px",
      fontSize: "0.9rem",
      border: "none",
      width:"100%",
    }}
      onClick={() => navigate("/meeting")} // ✅ Go to MeetingPage
            >
    <i className="bi bi-telephone me-2"></i>
    Rejoin Meeting
  </button>
       <div className="d-flex gap-2 mt-2 flex-wrap">
  <button
    className="btn flex-fill py-1 fw-semibold"
    style={{
      backgroundColor: "white",
      color:"black",
      border: "1px solid #d6d0d0ff",
      width:"60px",
      height:"30px",
      borderRadius: "6px",
      fontSize: "14px",
      transition: "all 0.3s ease",
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = "#afafb0ff"; 
      e.target.style.color = "white";
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = "white";
      e.target.style.color = "black";
    }}
     onClick={() => navigate("/dashboard")}
  >
    <Plus size={14} className="me-2" />
    New Meeting
  </button>

  <button
    className="btn flex-fill py-1 fw-semibold"
    style={{
      backgroundColor: "white",
      color:"black",
      border: "1px solid #d6d0d0ff",
      width:"60px",
      height:"30px",
      borderRadius: "6px",
      fontSize: "14px",
      transition: "all 0.3s ease",
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = "#afafb0ff";
      e.target.style.color = "white";
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = "white";
      e.target.style.color = "black";
    }}
    onClick={() => navigate("/")}
  >
    <Home size={14} className="me-2" />
    Go Home
  </button>
</div>
        </div>
      </div>
    </div>
    </div>
  );
}
