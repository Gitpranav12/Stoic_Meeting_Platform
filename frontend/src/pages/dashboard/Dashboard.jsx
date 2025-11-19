import React, { useState } from "react";
import { motion } from "framer-motion";
import QuickActions from "./QuickActions";
import { useNavigate } from "react-router-dom";
import UpcomingMeetings from "./UpcomingMeetings";
import RecentMessages from "./RecentMessages";
import CreateNewMeetingModal from "../WaitingRoom/CreateNewMeetingModal";
import { useEffect, useRef } from "react";
import SettingsModal from "../../components/Settings";

export default function Dashboard() {
  const [showNewMeetingDialog, setShowNewMeetingDialog] = useState(false);
  const [userName, setUserName] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [isCameraPreviewOn, setIsCameraPreviewOn] = useState(false);
  const [isMicPreviewOn, setIsMicPreviewOn] = useState(true);

  const [toastMessage, setToastMessage] = useState(""); // short UI feedback for copy/share
  const [settingsOpen, setSettingsOpen] = useState(false);

   const [showMeetingLinkPopup, setShowMeetingLinkPopup] = useState(false);
  const [showInstantMeetingUI, setShowInstantMeetingUI] = useState(false);

  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedUser);
    console.log(loggedUser)
  }, []);

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

  const handleOpenChat = () => {
    navigate("/dashboard/chat");
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
 // REQUIRED NEW FUNCTIONS =======================

  // ✔ Create meeting for later → show Google Meet–style popup
  const handleCreateForLater = () => {
    setShowMeetingLinkPopup(true);
  };

  // ✔ Start instant meeting (camera+join UI)
  const handleInstantMeeting = () => {
    setShowInstantMeetingUI(true);
    setIsCameraPreviewOn(true);
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
              <h3>Welcome back, {user?.fullName || user?.name}</h3>
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
                <UpcomingMeetings
                  meetings={upcomingMeetings}
                  onJoin={handleJoinMeetingClick}
                />
              </div>
              <div className="col-lg-6">
                <RecentMessages
                  messages={recentMessages}
                  onOpenChat={handleOpenChat}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 🧩 New Meeting Modal Component */}
      <CreateNewMeetingModal
        show={showNewMeetingDialog}
        onHide={() => {
          stopCameraStream();
          setShowNewMeetingDialog(false);
        }}
         userName={userName}
        setUserName={setUserName}
        meetingId={meetingId}
        isCameraPreviewOn={isCameraPreviewOn}
        setIsCameraPreviewOn={setIsCameraPreviewOn}
        isMicPreviewOn={isMicPreviewOn}
        setIsMicPreviewOn={setIsMicPreviewOn}
        videoRef={videoRef}
        toastMessage={toastMessage}
        setToastMessage={setToastMessage}
        copyMeetingLink={copyMeetingLink}
        shareMeetingLink={shareMeetingLink}
        handleJoinMeetingClick={handleJoinMeetingClick}
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
        SettingsModal={SettingsModal}
        handleCreateForLater={handleCreateForLater}
        handleInstantMeeting={handleInstantMeeting}
        showMeetingLinkPopup={showMeetingLinkPopup}
        setShowMeetingLinkPopup={setShowMeetingLinkPopup}
        showInstantMeetingUI={showInstantMeetingUI}
        setShowInstantMeetingUI={setShowInstantMeetingUI}
      />
    </div>
  );
}
