import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import Settings from "../../../components/Settings";

import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Settings as SettingsIcon,
  MessageSquare,
  ThumbsUp,
  Grid,
  MoreVertical,
  PhoneOff,
  Monitor,
  Hand,
  // New Icons added
  Circle,
  Users,
  Maximize,
  Keyboard,
  Captions,
  Image as ImageIcon,
} from "lucide-react";

export default function SettingsControlBar({
  isCameraOn,
  setIsCameraOn,
  isMicOn,
  setIsMicOn,
  onScreenShare,
  onHandRaise,
  onReaction,
  onChat,
  onGrid,
  onMore,
  onEndCall,
  videoRef,
}) {
  const [showSettings, setShowSettings] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [captions, setCaptions] = useState(false);
  const [virtualBg, setVirtualBg] = useState(false);
  const [isRecording, setIsRecording] = useState(false); // Recording State
  const localVideoRef = useRef(null);
  const streamRef = useRef(null);

  // CAMERA + MIC LOGIC
  useEffect(() => {
    if (isCameraOn || isMicOn) {
      navigator.mediaDevices
        .getUserMedia({
          video: isCameraOn,
          audio: isMicOn,
        })
        .then((stream) => {
          streamRef.current = stream;

          if (localVideoRef.current && isCameraOn) {
            localVideoRef.current.srcObject = stream;
          }

          if (videoRef && videoRef.current && isCameraOn) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(() => {
          setIsCameraOn(false);
          setIsMicOn(false);
        });
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      if (localVideoRef.current) localVideoRef.current.srcObject = null;
      if (videoRef?.current) videoRef.current.srcObject = null;
    }
  }, [isCameraOn, isMicOn, videoRef, setIsCameraOn, setIsMicOn]);

  // Toggle Full Screen Function
  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setShowMoreMenu(false);
  };

  const circleBtn = {
    width: 54,
    height: 54,
    borderRadius: "50%",
    background: "#1e2b44",
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  // Helper for menu items
  const menuItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 0",
    cursor: "pointer",
    fontSize: "14px",
    color: "#333",
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          background: "#0d1425",
          borderTop: "1px solid #1f2a44",
          padding: "14px 0",
          zIndex: 999,
        }}
        className="d-flex justify-content-center align-items-center gap-3"
      >
        {/* MIC */}
        <Button style={circleBtn} onClick={() => setIsMicOn(!isMicOn)}>
          {isMicOn ? (
            <Mic size={18} color="#fff" />
          ) : (
            <MicOff size={18} color="#fff" />
          )}
        </Button>

        {/* CAMERA */}
        <Button style={circleBtn} onClick={() => setIsCameraOn(!isCameraOn)}>
          {isCameraOn ? (
            <Video size={18} color="#fff" />
          ) : (
            <VideoOff size={18} color="#fff" />
          )}
        </Button>

        {/* SCREEN SHARE */}
        <Button style={circleBtn} onClick={onScreenShare}>
          <Monitor size={18} color="#fff" />
        </Button>

        {/* HAND RAISE */}
        <Button style={circleBtn} onClick={onHandRaise}>
          <Hand size={18} color="#fff" />
        </Button>

        {/* REACTION */}
        <Button style={circleBtn} onClick={onReaction}>
          <ThumbsUp size={18} color="#fff" />
        </Button>

        {/* GRID */}
        <Button style={circleBtn} onClick={onGrid}>
          <Grid size={18} color="#fff" />
        </Button>

        {/* CHAT */}
        <Button style={circleBtn} onClick={onChat}>
          <MessageSquare size={18} color="#fff" />
        </Button>

        {/* SETTINGS */}
        <Button style={circleBtn} onClick={() => setShowSettings(true)}>
          <SettingsIcon size={18} color="#fff" />
        </Button>

        {/* MORE (vertical) */}
        <Button style={circleBtn} onClick={() => setShowMoreMenu((v) => !v)}>
          <MoreVertical size={18} color="#fff" />
        </Button>

        {/* END CALL */}
        <Button
          style={{ ...circleBtn, background: "#e84141" }}
          onClick={onEndCall}
        >
          <PhoneOff size={18} color="#fff" />
        </Button>
      </div>

      {/* ----- MORE OPTIONS POPUP ----- */}
      {showMoreMenu && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "calc(50% - 300px)",
            background: "#ffffff",
            borderRadius: "12px",
            padding: "18px",
            width: "260px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
            zIndex: 2000,
            animation: "fadeIn 0.2s",
          }}
        >
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>

          <div className="fw-bold mb-2" style={{ fontSize: "14px" }}>
            More Options
          </div>

          {/* Start Recording */}
          <div style={menuItemStyle} onClick={() => setIsRecording(!isRecording)}>
             <Circle size={18} color={isRecording ? "#e84141" : "#333"} fill={isRecording ? "#e84141" : "none"} />
             <span>{isRecording ? "Stop Recording" : "Start Recording"}</span>
          </div>

          {/* Breakout Rooms */}
          <div style={menuItemStyle}>
             <Users size={18} color="#333" />
             <span>Create Breakout Rooms</span>
          </div>

          {/* Full Screen */}
          <div style={menuItemStyle} onClick={handleFullScreen}>
             <Maximize size={18} color="#333" />
             <span>Full Screen</span>
          </div>

          {/* Keyboard Shortcuts */}
          <div style={menuItemStyle}>
             <Keyboard size={18} color="#333" />
             <span>Keyboard Shortcuts</span>
          </div>

          <hr />

          {/* Captions Toggle */}
          <div
            style={{ ...menuItemStyle, justifyContent: "space-between" }}
            onClick={() => setCaptions(!captions)}
          >
            <div className="d-flex align-items-center gap-2">
                <Captions size={18} color="#333" />
                <span>Enable Captions</span>
            </div>
            <input type="checkbox" checked={captions} readOnly />
          </div>

          {/* Virtual Background Toggle */}
          <div
            style={{ ...menuItemStyle, justifyContent: "space-between" }}
            onClick={() => setVirtualBg(!virtualBg)}
          >
            <div className="d-flex align-items-center gap-2">
                <ImageIcon size={18} color="#333" />
                <span>Virtual Background</span>
            </div>
            <input type="checkbox" checked={virtualBg} readOnly />
          </div>
        </div>
      )}

      {/* hidden video */}
      <video ref={localVideoRef} autoPlay muted style={{ display: "none" }} />

      <Settings show={showSettings} onClose={() => setShowSettings(false)} />
    </>
  );
}