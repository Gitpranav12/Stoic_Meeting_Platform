import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Video,
  MessageSquare,
  Settings,
  Search,
  Plus,
  Clock,
  Users,
  Bell,
  VideoOff,
  MicOff,
  Mic,
  Camera,
} from "lucide-react";
import { Modal, Button, Form, Card, Badge, InputGroup } from "react-bootstrap";
import Sidebar from "../../common/Sidebar";

export default function Dashboard({ active = "dashboard"}) {
  const [showNewMeetingDialog, setShowNewMeetingDialog] = useState(false);
  const [meetingLink, setMeetingLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [userName, setUserName] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [isCameraPreviewOn, setIsCameraPreviewOn] = useState(false);
  const [isMicPreviewOn, setIsMicPreviewOn] = useState(true);

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

  const handleJoinMeeting = () => {
    if (userName.trim()) {
      setShowNewMeetingDialog(false);
     // onNavigate("meeting");
    }
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* ✅ Sidebar Component */}
      <Sidebar  active={active}/>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Top Navbar */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white border-bottom p-3 d-flex justify-content-between align-items-center"
        >
          <InputGroup style={{ maxWidth: "400px" }}>
            <InputGroup.Text>
              <Search size={16} />
            </InputGroup.Text>
            <Form.Control placeholder="Search meetings, messages, or people..." />
          </InputGroup>

          <div className="d-flex align-items-center gap-3">
            <Button
              variant="light"
              className="position-relative rounded-circle p-2"
            >
              <Bell size={18} />
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger rounded-circle"></span>
            </Button>
            <div
              className="bg-secondary text-white rounded-circle d-flex justify-content-center align-items-center"
              style={{ width: "36px", height: "36px", cursor: "pointer" }}
             // onClick={() => onNavigate("settings")} // navigate to settings
            >
              JD
            </div>
          </div>
        </motion.div>

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
            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <Card
                  onClick={handleStartNewMeeting}
                  className="h-100 shadow-sm hover-shadow"
                >
                  <Card.Body className="d-flex align-items-center gap-3">
                    <div className="bg-primary-subtle p-3 rounded">
                      <Plus size={24} className="text-primary" />
                    </div>
                    <div>
                      <h6>Start New Meeting</h6>
                      <p className="text-muted small mb-0">
                        Create instant meeting
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </div>

              <div className="col-md-4">
                <Card
                 // onClick={() => onNavigate("meeting")}
                  className="h-100 shadow-sm hover-shadow"
                >
                  <Card.Body className="d-flex align-items-center gap-3">
                    <div className="bg-success-subtle p-3 rounded">
                      <Video size={24} className="text-success" />
                    </div>
                    <div>
                      <h6>Join Meeting</h6>
                      <p className="text-muted small mb-0">
                        Enter meeting code
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </div>

              <div className="col-md-4">
                <Card
                  //onClick={() => onNavigate("chat")}
                  className="h-100 shadow-sm hover-shadow"
                >
                  <Card.Body className="d-flex align-items-center gap-3">
                    <div className="bg-info-subtle p-3 rounded">
                      <MessageSquare size={24} className="text-info" />
                    </div>
                    <div>
                      <h6>Open Chat</h6>
                      <p className="text-muted small mb-0">View all messages</p>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>

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
                        <Button size="sm" 
                        //onClick={() => onNavigate("meeting")}
                        
                        >
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
                       // onClick={() => onNavigate("chat")}
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

      {/* New Meeting Modal */}
      <Modal
        show={showNewMeetingDialog}
        onHide={() => setShowNewMeetingDialog(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Start New Meeting</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="row">
            {/* Left: Camera Preview */}
            <div className="col-lg-6 bg-dark text-center text-white rounded p-4">
              <div className="mb-4">
                {isCameraPreviewOn ? (
                  <div>
                    <div
                      className="rounded-circle bg-primary d-inline-flex justify-content-center align-items-center"
                      style={{ width: "100px", height: "100px" }}
                    >
                      JD
                    </div>
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
                  className="rounded-circle p-3"
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
                  className="rounded-circle p-3"
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
                <Form.Group className="mb-3">
                  <Form.Label>Meeting ID</Form.Label>
                  <Form.Control value={meetingId} readOnly />
                </Form.Group>
                <Button
                  variant="secondary"
                  className="w-100 mb-2"
                  disabled={!userName.trim()}
                  onClick={handleJoinMeeting}
                >
                  Join now
                </Button>
                <Button variant="outline-secondary" className="w-100">
                  <Settings size={16} className="me-2" />
                  Audio & video settings
                </Button>
              </Form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
