import React, { useState, useRef } from "react";
import SettingsControlBar from "./Pages/SettingsControlBar";
import { MicOff, Hand } from "lucide-react";

const MeetingRoom = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [showHandAnimation, setShowHandAnimation] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [floatingReactions, setFloatingReactions] = useState([]);
  const [showGridPopup, setShowGridPopup] = useState(false);
  const [viewMode, setViewMode] = useState("gallery");
  const [gridSize, setGridSize] = useState("small");
  const [showChatPanel, setShowChatPanel] = useState(false);
  const videoRef = useRef(null);
  const screenShareRef = useRef(null);
  const selfTileRef = useRef(null);

  const participants = [
    { name: "Varun Iyer", initial: "V", self: true },
    { name: "astha thakur", initial: "AT" },
    { name: "Amit Rajak", initial: "AR" },
    { name: "Priyanshu Katiyar", initial: "PK" },
    { name: "Simran Joshi", initial: "SJ", muted: true },
    { name: "Sneha Verma", initial: "SV", muted: true },
  ];

  // HAND RAISE FUNCTION
  const handleHandRaise = () => {
    setHandRaised(true);
    setShowHandAnimation(true);

    // auto hide animation after 3 sec
    setTimeout(() => setShowHandAnimation(false), 1000);
  };

  const handleGridPopup = () => {
    setShowGridPopup((prev) => !prev);
  };

  // SCREEN SHARE FUNCTION
  const handleScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });

      if (screenShareRef.current) {
        screenShareRef.current.srcObject = stream;
      }
      setIsScreenSharing(true);
      // stop screen share when user stops manually
      stream.getVideoTracks()[0].onended = () => {
        setIsScreenSharing(false);
      };
    } catch (err) {
      console.log("Screen share cancelled");
    }
  };
  // REACTIONS
  const REACTION_OPTIONS = ["👍", "❤️", "😂", "👏", "🎉"];

  // When thumbs button is clicked (from control bar)
  const handleOpenReactionPicker = () => {
    setShowReactionPicker((s) => !s);
  };

  // Called when an emoji is chosen
  const handleSelectReaction = (emoji) => {
    // compute self tile position
    const rect = selfTileRef.current?.getBoundingClientRect();
    const id = Date.now() + Math.random();

    // default to center if no rect
    const left = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const top = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    const newReaction = { id, emoji, left, top };
    setFloatingReactions((prev) => [...prev, newReaction]);

    // hide picker after selection
    setShowReactionPicker(false);

    // remove after 2s
    setTimeout(() => {
      setFloatingReactions((prev) => prev.filter((r) => r.id !== id));
    }, 1000);
  };

  return (
    <div
      className="container-fluid p-0"
      style={{ height: "100vh", background: "#0c1220" }}
    >
      {/* Inline keyframes and small helper styles */}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-80px) scale(1.2); opacity: 0; }
        }
        @keyframes fadeOut3 {
          0% { opacity: 1; } 90% { opacity: 1; } 100% { opacity: 0; }
        }
        .reaction-picker {
          position: fixed;
          bottom: 90px;
          left: 50%;
          transform: translateX(-50%);
          background: #1b2533;
          padding: 8px 10px;
          border-radius: 12px;
          display: flex;
          gap: 10px;
          z-index: 1200;
          box-shadow: 0 6px 18px rgba(0,0,0,0.5);
        }
        .reaction-btn {
          font-size: 22px;
          cursor: pointer;
          user-select: none;
          background: transparent;
          border: none;
        }
        .floating-emoji {
          position: fixed;
          font-size: 28px;
          z-index: 2000;
          pointer-events: none;
          transform-origin: center;
          animation: floatUp 2s forwards;
          text-shadow: 0 4px 10px rgba(0,0,0,0.4);
        }
      `}</style>

      {/* Header */}
      <div
        className="d-flex justify-content-between align-items-center px-4 py-3"
        style={{
          background: "#0f1a33",
          color: "#fff",
          borderBottom: "1px solid #1f2a44",
        }}
      >
        <div>
          <h5 className="m-0 fw-bold">Team Meeting</h5>
          <small>Meeting ID: 123-456-789</small>
        </div>

        <div className="d-flex align-items-center gap-4">
          <div
            className="px-3 py-1 rounded-pill"
            style={{
              background: "#2a1120",
              color: "#ff6d6d",
              fontWeight: "bold",
            }}
          >
            ● 2m 54s
          </div>

          <div
            className="px-3 py-1 rounded-pill"
            style={{ background: "#1a253d" }}
          >
            👥 7
          </div>
        </div>
      </div>

      {/* Main section */}
      {/* Main section */}
      <div
        className="row m-0"
        style={{ height: "calc(100% - 140px)", overflow: "hidden" }}
      >
        {/* Video Grid - auto expand when chat is hidden */}
        <div className={`${showChatPanel ? "col-md-9" : "col-md-12"} p-4`}>
          <div className="row g-4">
            {participants.map((user, idx) => {
              const isSelf = !!user.self;

              let hiddenInSpeaker = false;
              if (viewMode === "speaker" && !user.self) hiddenInSpeaker = true;

              const tileRefProps = isSelf ? { ref: selfTileRef } : {};

              return (
                <div
                  key={idx}
                  className={
                    viewMode === "speaker"
                      ? isSelf
                        ? "col-12"
                        : "d-none"
                      : gridSize === "small"
                      ? "col-6 col-md-4"
                      : gridSize === "medium"
                      ? "col-6 col-md-6"
                      : "col-12"
                  }
                >
                  <div
                    {...tileRefProps}
                    className="rounded position-relative"
                    style={{
                      background: "linear-gradient(180deg, #122033, #0c1525)",
                      border:
                        user.initial === "V"
                          ? "2px solid #3effad"
                          : "1px solid #1f2a44",
                      height: "190px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      overflow: "hidden",
                    }}
                  >
                    {/* SELF TILE → CAMERA OR SCREEN SHARE */}
                    {user.self && isScreenSharing ? (
                      <video
                        ref={screenShareRef}
                        autoPlay
                        muted
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          position: "absolute",
                          top: 0,
                          left: 0,
                        }}
                      ></video>
                    ) : user.self && isCameraOn ? (
                      <video
                        autoPlay
                        muted
                        ref={videoRef}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          position: "absolute",
                          top: 0,
                          left: 0,
                        }}
                      ></video>
                    ) : (
                      <>
                        <div
                          className="rounded-circle d-flex justify-content-center align-items-center"
                          style={{
                            width: "65px",
                            height: "65px",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "22px",
                            background:
                              user.initial === "AT"
                                ? "linear-gradient(135deg, #8a2be2, #d95fff)"
                                : user.initial === "AR"
                                ? "linear-gradient(135deg, #ff4f7a, #ff8dd1)"
                                : user.initial === "PK"
                                ? "linear-gradient(135deg, #20c567, #36eb78)"
                                : user.initial === "SJ" || user.initial === "SV"
                                ? "linear-gradient(135deg, #ff8800, #ffbd4a)"
                                : "linear-gradient(135deg, #3b82f6, #60a5fa)",
                          }}
                        >
                          {user.initial}
                        </div>
                        <span className="mt-2 text-white fw-semibold">
                          {user.name}
                        </span>
                      </>
                    )}

                    {/* Mic OFF */}
                    {!isMicOn && user.self ? (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "10px",
                          right: "10px",
                          background: "#e84141",
                          padding: "6px",
                          borderRadius: "50%",
                        }}
                      >
                        <MicOff size={16} color="white" />
                      </div>
                    ) : user.muted ? (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "10px",
                          right: "10px",
                          background: "#e84141",
                          padding: "6px",
                          borderRadius: "50%",
                        }}
                      >
                        <MicOff size={16} color="white" />
                      </div>
                    ) : null}

                    {/* Hand Raise */}
                    {user.self && handRaised && (
                      <div
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          background: "#f7b731",
                          padding: "6px",
                          borderRadius: "50%",
                        }}
                      >
                        <Hand size={16} color="white" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Panel - fully removed when hidden */}
        {showChatPanel && (
          <div
            className="col-md-3 p-4"
            style={{
              background: "#0b1320",
              borderLeft: "1px solid #1f2a44",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              paddingBottom: "0",
            }}
          >
            <h6 className="fw-bold">Live Chat</h6>

            <div className="mt-3" style={{ height: "70%", overflowY: "auto" }}>
              <div className="mb-3">
                <strong>Sarah</strong>
                <div className="text-muted">Hey everyone!</div>
                <small>10:00 AM</small>
              </div>

              <div className="mb-3">
                <strong>Mike</strong>
                <div className="text-muted">Good morning team</div>
                <small>10:01 AM</small>
              </div>

              <div className="mb-3">
                <strong>You</strong>
                <div className="text-muted">Ready to start?</div>
                <small>10:02 AM</small>
              </div>
            </div>

            <div className="d-flex gap-2 mt-3">
              <input
                className="form-control"
                placeholder="Type a message..."
                style={{
                  background: "#0a1320",
                  color: "#fff",
                  border: "1px solid #1f2a44",
                }}
              />
              <button className="btn btn-primary">➤</button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Control Bar */}
      <SettingsControlBar
        isCameraOn={isCameraOn}
        setIsCameraOn={setIsCameraOn}
        isMicOn={isMicOn}
        setIsMicOn={setIsMicOn}
        videoRef={videoRef}
        onScreenShare={handleScreenShare}
        onHandRaise={() => {
          handleHandRaise();
          setHandRaised(true);
          // automatically clear the tile badge after 5s
          setTimeout(() => setHandRaised(false), 5000);
        }}
        onReaction={handleOpenReactionPicker}
        onGrid={handleGridPopup}
        onChat={() => setShowChatPanel((prev) => !prev)}
      />

      {/* Reaction picker near bottom center */}
      {showReactionPicker && (
        <div className="reaction-picker" role="dialog" aria-label="reactions">
          {REACTION_OPTIONS.map((r) => (
            <button
              key={r}
              className="reaction-btn"
              onClick={() => handleSelectReaction(r)}
              aria-label={`react-${r}`}
            >
              {r}
            </button>
          ))}
        </div>
      )}

      {/* FLOATING REACTIONS */}
      {floatingReactions.map((fr) => (
        <div
          key={fr.id}
          className="floating-emoji"
          style={{
            left: fr.left - 14 + "px", // center approx
            top: fr.top - 24 + "px",
          }}
        >
          {fr.emoji}
        </div>
      ))}

      {/* FULL SCREEN HAND ANIMATION */}
      {showHandAnimation && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            animation: "fadeOut3 3s forwards",
          }}
        >
          <Hand size={80} color="#ffd700" />
        </div>
      )}
      {showGridPopup && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#ffffff",
            borderRadius: "12px",
            padding: "20px",
            width: "260px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
            zIndex: 2000,
          }}
        >
          <h6 className="fw-bold mb-3" style={{ color: "#000" }}>
            View Mode
          </h6>

          {/* Gallery View */}
          <div
            onClick={() => setViewMode("gallery")}
            style={{
              padding: "10px 12px",
              borderRadius: "10px",
              cursor: "pointer",
              background: viewMode === "gallery" ? "#eef2ff" : "transparent",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "6px",
            }}
          >
            <span>📑 Gallery View</span>
            {viewMode === "gallery" && <span>✔</span>}
          </div>

          {/* Speaker View */}
          <div
            onClick={() => setViewMode("speaker")}
            style={{
              padding: "10px 12px",
              borderRadius: "10px",
              cursor: "pointer",
              background: viewMode === "speaker" ? "#eef2ff" : "transparent",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "6px",
            }}
          >
            <span>📷 Speaker View</span>
            {viewMode === "speaker" && <span>✔</span>}
          </div>

          <hr />

          <h6 className="fw-bold mt-3 mb-2" style={{ color: "#000" }}>
            Grid Size
          </h6>

          {/* SMALL */}
          <div
            onClick={() => setGridSize("small")}
            style={{
              padding: "10px 12px",
              borderRadius: "10px",
              cursor: "pointer",
              background: gridSize === "small" ? "#eef2ff" : "transparent",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Small</span>
            {gridSize === "small" && <span>✔</span>}
          </div>

          {/* MEDIUM */}
          <div
            onClick={() => setGridSize("medium")}
            style={{
              padding: "10px 12px",
              borderRadius: "10px",
              cursor: "pointer",
              background: gridSize === "medium" ? "#eef2ff" : "transparent",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Medium</span>
            {gridSize === "medium" && <span>✔</span>}
          </div>

          {/* LARGE */}
          <div
            onClick={() => setGridSize("large")}
            style={{
              padding: "10px 12px",
              borderRadius: "10px",
              cursor: "pointer",
              background: gridSize === "large" ? "#eef2ff" : "transparent",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Large</span>
            {gridSize === "large" && <span>✔</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingRoom;
