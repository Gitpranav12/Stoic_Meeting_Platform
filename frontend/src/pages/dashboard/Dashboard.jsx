import React, { useState } from "react";
import { motion } from "framer-motion";
import {Video,Settings,Clock,Users,VideoOff,MicOff,Mic,Camera,Share2,Link as LinkIcon,} from "lucide-react";
import { useEffect, useRef } from "react";
import { Modal, Button, Form, Card, Badge, Alert } from "react-bootstrap";
import QuickActions from "./QuickActions";
import SettingsModal from "../../components/Settings";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [showNewMeetingDialog, setShowNewMeetingDialog] = useState(false);
  const [userName, setUserName] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [isCameraPreviewOn, setIsCameraPreviewOn] = useState(false);
  const [isMicPreviewOn, setIsMicPreviewOn] = useState(true);
  const [toastMessage, setToastMessage] = useState(""); // short UI feedback for copy/share
  const [settingsOpen, setSettingsOpen] = useState(false);
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const navigate = useNavigate();

  const upcomingMeetings = [
    {
      id: 1,
      title: "Team Standup",
      time: "10:00 AM",
      participants: 5,
      date: "Today",
    },
    {
      id: 2,
      title: "Client Review",
      time: "2:00 PM",
      participants: 3,
      date: "Today",
    },
    {
      id: 3,
      title: "Design Sprint",
      time: "11:00 AM",
      participants: 8,
      date: "Tomorrow",
    },
    {
      id: 4,
      title: "Product Planning",
      time: "3:30 PM",
      participants: 6,
      date: "Tomorrow",
    },
  ];

  const recentMessages = [
    {
      id: 1,
      from: "Sarah Johnson",
      message: "Can we reschedule the meeting?",
      time: "5m ago",
      unread: 2,
    },
    {
      id: 2,
      from: "Mike Chen",
      message: "Shared the latest design files",
      time: "1h ago",
      unread: 0,
    },
    {
      id: 3,
      from: "Team Alpha",
      message: "Great work on the presentation!",
      time: "2h ago",
      unread: 1,
    },
  ];

  const handleStartNewMeeting = () => {
    const randomId = `meeting-${Math.random().toString(36).substring(2, 11)}`;
    setMeetingId(randomId);
    setShowNewMeetingDialog(true);
  };

  const handleJoinMeetingClick = () => {
    navigate("/meeting");
  };

  // --- Camera control functions ---
  const startCameraStream = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setToastMessage("Camera API not available in this browser.");
        clearToastLater();
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      mediaStreamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
        await videoRef.current.play().catch(() => {});
      }
    } catch (err) {
      console.error("Failed to start camera:", err);
      setToastMessage("Unable to access camera. Allow permission and retry.");
      clearToastLater();
    }
  };

  const stopCameraStream = () => {
    const stream = mediaStreamRef.current;
    if (stream && stream.getTracks) {
      stream.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      try {
        videoRef.current.pause();
        videoRef.current.srcObject = null;
      } catch (e) {}
    }
  };

  useEffect(() => {
    if (isCameraPreviewOn) startCameraStream();
    else stopCameraStream();
    return stopCameraStream;
  }, [isCameraPreviewOn]);

  // --- Share link functions Added ---
  const buildMeetingUrl = () => {
    const base = window.location.origin || "https://example.com";
    return `${base}/meeting/${meetingId || ""}`;
  };

  //  Updated copyMeetingLink with robust fallback for all browsers
  const copyMeetingLink = async () => {
    const link = buildMeetingUrl();

    if (!meetingId) {
      setToastMessage("❌ No meeting link available. Start a meeting first.");
      clearToastLater();
      return;
    }

    try {
      if (
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        await navigator.clipboard.writeText(link);
        setToastMessage("✅ Meeting link copied successfully!");
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = link;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setToastMessage("✅ Meeting link copied successfully!");
      }
    } catch (err) {
      console.error("Copy failed:", err);
      window.prompt("Copy this meeting link manually:", link);
      setToastMessage("⚠️ Link shown — please copy manually.");
    }

    clearToastLater();
  };

  // shareMeetingLink with fallback to copyMeetingLink
  const shareMeetingLink = async () => {
    const link = buildMeetingUrl();
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join my meeting",
          text: `Join my meeting: ${meetingId}`,
          url: link,
        });
        setToastMessage("📤 Shared meeting link");
      } catch (err) {
        console.info("Share cancelled", err);
        setToastMessage("Share cancelled");
      }
    } else {
      await copyMeetingLink();
    }
    clearToastLater();
  };
  const clearToastLater = (ms = 2200) => {
    setTimeout(() => setToastMessage(""), ms);
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Dashboard Body */}
        <div className="p-4 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <h3>Welcome back, John!</h3>
              <p className="text-muted">
                Here's what's happening with your meetings today.
              </p>
            </div>

            {/* Quick Actions */}
            <QuickActions
              onStartMeeting={handleStartNewMeeting}
              onJoinMeeting={handleJoinMeetingClick}
              onOpenChat={() => navigate("/dashboard/chat")}
            />

            {/* Upcoming Meetings & Messages */}
            <div className="row g-4">
              <div className="col-lg-6">
                <Card>
                  <Card.Header>
                    <h6 className="mb-0">Upcoming Meetings</h6>
                    <small className="text-muted">
                      Your scheduled meetings
                    </small>
                  </Card.Header>
                  <Card.Body>
                    {upcomingMeetings.map((meeting) => (
                      <motion.div
                        key={meeting.id}
                        whileHover={{ scale: 1.02 }}
                        className="d-flex justify-content-between align-items-center border rounded p-3 mb-3"
                      >
                        <div>
                          <h6 className="mb-1">{meeting.title}</h6>
                          <div className="d-flex align-items-center gap-3 text-muted small">
                            <span>
                              <Clock size={14} /> {meeting.time}
                            </span>
                            <span>
                              <Users size={14} /> {meeting.participants}
                            </span>
                            <Badge bg="secondary">{meeting.date}</Badge>
                          </div>
                        </div>
                        <Button size="sm" onClick={handleJoinMeetingClick}>
                          Join
                        </Button>
                      </motion.div>
                    ))}
                  </Card.Body>
                </Card>
              </div>

              <div className="col-lg-6">
                <Card>
                  <Card.Header>
                    <h6 className="mb-0">Recent Messages</h6>
                    <small className="text-muted">Latest conversations</small>
                  </Card.Header>
                  <Card.Body>
                    {recentMessages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        whileHover={{ scale: 1.02 }}
                        className="d-flex align-items-start border rounded p-3 mb-3"
                        onClick={() => navigate("/dashboard/chat")}
                      >
                        <div
                          className="bg-secondary text-white rounded-circle d-flex justify-content-center align-items-center me-3"
                          style={{ width: "40px", height: "40px" }}
                        >
                          {msg.from
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between">
                            <strong>{msg.from}</strong>
                            <small className="text-muted">{msg.time}</small>
                          </div>
                          <p className="text-muted small mb-0">{msg.message}</p>
                        </div>
                        {msg.unread > 0 && (
                          <Badge bg="danger" pill>
                            {msg.unread}
                          </Badge>
                        )}
                      </motion.div>
                    ))}
                  </Card.Body>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* New Meeting Modal & Inline Overlay for Modal Blur*/}
      {showNewMeetingDialog && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1040,
            background: "rgba(40,38,38,0.35)",
            backdropFilter: "blur(4px)",
          }}
        />
      )}

      <Modal
        show={showNewMeetingDialog}
        onHide={() => {
          stopCameraStream(); // 🟢 Stop camera when modal closes
          setShowNewMeetingDialog(false);
        }}
        centered
        size="lg"
        style={{ zIndex: 1050 }}
      >
        <Modal.Header
          closeButton
          style={{ background: "#1e2428ff", color: "#ffff" }}
        >
          <Modal.Title>Start New Meeting</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="p-4"
          style={{
            background: "#2b3033ff",
            color: "#fff",
          }}
        >
          <div className="row">
            {/* Left: Camera Preview */}
            <div
              className="col-lg-6 bg-dark text-center text-white rounded p-3 d-flex flex-column justify-content-between"
              style={{ minHeight: "350px" }}
            >
              <div className="mb-4">
                {isCameraPreviewOn ? (
                  <div>
                    <video
                      ref={videoRef}
                      style={{
                        width: "100%",
                        height: "240px",
                        borderRadius: "8px",
                        background: "#000",
                        objectFit: "cover",
                      }}
                      playsInline
                      autoPlay
                    />
                    <p className="mt-3">Camera preview</p>
                  </div>
                ) : (
                  <div className="text-muted">
                    <Camera size={48} className="mb-2 opacity-50" />
                    <p>Camera preview</p>
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-center gap-3">
                <Button
                  variant={isCameraPreviewOn ? "secondary" : "danger"}
                  className="rounded-circle d-flex justify-content-center align-items-center"
                  style={{ width: "56px", height: "56px" }}
                  onClick={() => setIsCameraPreviewOn(!isCameraPreviewOn)}
                >
                  {isCameraPreviewOn ? (
                    <Video size={18} />
                  ) : (
                    <VideoOff size={18} />
                  )}
                </Button>
                <Button
                  variant={isMicPreviewOn ? "secondary" : "danger"}
                  className="rounded-circle d-flex justify-content-center align-items-center"
                  style={{ width: "56px", height: "56px" }}
                  onClick={() => setIsMicPreviewOn(!isMicPreviewOn)}
                >
                  {isMicPreviewOn ? <Mic size={18} /> : <MicOff size={18} />}
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setIsCameraPreviewOn(true)}
                >
                  <Video size={16} className="me-2" /> Start Camera
                </Button>
              </div>
            </div>

            {/* Right: Join Form */}
            <div className="col-lg-6 p-4">
              <h5 className="mb-3">Ready to join?</h5>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Your name</Form.Label>
                  <Form.Control
                    placeholder="Enter your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Form.Group>

                {/* Added Share Link Buttons */}
                <Form.Group className="mb-3">
                  <Form.Label>Meeting ID</Form.Label>
                  <div className="d-flex gap-2">
                    <Form.Control value={meetingId} readOnly />
                    <Button
                      variant="outline-secondary"
                      onClick={copyMeetingLink}
                    >
                      <LinkIcon size={14} />
                    </Button>
                    <Button
                      variant="outline-primary"
                      onClick={shareMeetingLink}
                    >
                      <Share2 size={14} />
                    </Button>
                  </div>

                  {/*  Visible Success Message Below Meeting ID */}
                  {toastMessage && (
                    <Alert
                      variant="success"
                      className="py-2 mt-2 mb-0 text-center"
                    >
                      {toastMessage}
                    </Alert>
                  )}
                </Form.Group>

                <Button
                  variant="primary"
                  className="w-100 mb-2"
                  disabled={!userName.trim()}
                  onClick={handleJoinMeetingClick}
                >
                  Join now
                </Button>
                {/* --- Audio & Video Settings Button --- */}
                <Button
                  variant="outline-secondary"
                  className="w-100 mt-2 d-flex justify-content-center align-items-center gap-2"
                  onClick={() => setSettingsOpen(true)}
                  style={{
                    borderColor: "#5f6368",
                    color: "#e0e0e0",
                    background: "transparent",
                    transition: "all 0.2s ease",
                  }}
                >
                  <Settings size={16} />
                  <span>Audio & video settings</span>
                </Button>
                <SettingsModal
                  show={settingsOpen}
                  onClose={() => setSettingsOpen(false)}
                />
              </Form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
