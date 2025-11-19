import React from "react";
import { Modal, Button, Form, Alert, Container, Row, Col } from "react-bootstrap";
import { Rocket } from "lucide-react";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Camera,
  Settings,
  Share2,
  Link as LinkIcon,
  Clipboard,
} from "lucide-react";

export default function CreateNewMeetingModal({
  show,
  onHide,
  userName,
  setUserName,
  meetingId,
  isCameraPreviewOn,
  setIsCameraPreviewOn,
  isMicPreviewOn,
  setIsMicPreviewOn,
  videoRef,
  copyMeetingLink,
  shareMeetingLink,
  toastMessage,
  setToastMessage,
  handleJoinMeetingClick,
  settingsOpen,
  setSettingsOpen,
  SettingsModal, // component or null
  handleCreateForLater,
  handleInstantMeeting,
  showMeetingLinkPopup,
  setShowMeetingLinkPopup,
  showInstantMeetingUI,
  setShowInstantMeetingUI,
}) {
  // defensive fallback if meetingId is undefined
  const safeMeetingId = meetingId || "—";
  const meetingUrl = `${window.location.origin}/meeting/${safeMeetingId}`;

  // Choose size dynamically: small when showing simple choice UI, large when showing camera+form
  const modalSize = showInstantMeetingUI ? "lg" : "md";

  const handleClose = () => {
    // reset internal UI states when closing
    setShowInstantMeetingUI(false);
    setShowMeetingLinkPopup(false);
    if (typeof onHide === "function") onHide();
  };

  return (
    <>
      {/* MAIN MODAL (size depends on UI) */}
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size={modalSize}
        dialogClassName="create-meeting-modal"
        style={{ zIndex: 1050 }}
      >
        <Modal.Header closeButton style={{ background: "#1e2428ff", color: "#fff" }}>
          <Modal.Title>Start New Meeting</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center py-2" style={{ background: "#2b3033", color: "#fff" }}>
          {/* FIRST: choice UI (small) */}
          {!showInstantMeetingUI && (
            <div className="py-1 d-flex flex-column gap-3 pb-2 align-items-center">
              <Button
                variant="light"
                className="py-1 fw-semibold border rounded-2 d-flex align-items-center justify-content-center gap-2"
                onClick={() => {
                  if (typeof handleCreateForLater === "function") handleCreateForLater();
                  // small delay so server can respond / meeting id can be created
                  setTimeout(() => setShowMeetingLinkPopup(true), 250);
                }}
                style={{
                  backgroundColor: "#fff",
                  width: "300px",
                  height: "36px",
                  color: "#000",
                  border: "1px solid #ccc",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#0B57D0";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.borderColor = "#0B57D0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#fff";
                  e.currentTarget.style.color = "#000";
                  e.currentTarget.style.borderColor = "#ccc";
                }}
              >
                <Clipboard size={14} />
                Create a meeting for later
              </Button>

              <Button
                variant="light"
                className="py-1 fw-semibold border rounded-2 d-flex align-items-center justify-content-center gap-2"
                onClick={() => {
                  setShowInstantMeetingUI(true);
                  if (typeof handleInstantMeeting === "function") handleInstantMeeting();
                }}
                style={{
                  backgroundColor: "#fff",
                  width: "300px",
                  height: "36px",
                  color: "#000",
                  border: "1px solid #ccc",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#0B57D0";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.borderColor = "#0B57D0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#fff";
                  e.currentTarget.style.color = "#000";
                  e.currentTarget.style.borderColor = "#ccc";
                }}
              >
                <Rocket size={14} />
                Start an instant meeting
              </Button>
            </div>
          )}

          {/* SECOND: instant meeting UI (camera preview + form) */}
          {showInstantMeetingUI && (
            <Container fluid>
              <Row className="g-3">
                {/* LEFT - camera preview */}
                <Col lg={6} xs={12}>
                  <div
                    className="bg-dark text-center text-white rounded p-3 d-flex flex-column justify-content-between"
                    style={{ minHeight: "350px" }}
                  >
                    <div className="mb-3">
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
                          <p className="mt-3 mb-0">Camera preview</p>
                        </div>
                      ) : (
                        <div className="text-muted d-flex flex-column align-items-center justify-content-center">
                          <Camera size={48} className="mb-2 opacity-50" />
                          <p className="mb-0">Camera preview</p>
                        </div>
                      )}
                    </div>

                    {/* controls */}
                    <div className="d-flex justify-content-center gap-3">
                      <Button
                        variant={isCameraPreviewOn ? "secondary" : "danger"}
                        className="rounded-circle d-flex justify-content-center align-items-center"
                        style={{ width: "56px", height: "56px" }}
                        onClick={() => setIsCameraPreviewOn(!isCameraPreviewOn)}
                      >
                        {isCameraPreviewOn ? <Video size={18} /> : <VideoOff size={18} />}
                      </Button>

                      <Button
                        variant={isMicPreviewOn ? "secondary" : "danger"}
                        className="rounded-circle d-flex justify-content-center align-items-center"
                        style={{ width: "56px", height: "56px" }}
                        onClick={() => setIsMicPreviewOn(!isMicPreviewOn)}
                      >
                        {isMicPreviewOn ? <Mic size={18} /> : <MicOff size={18} />}
                      </Button>

                      <Button variant="primary" onClick={() => setIsCameraPreviewOn(true)}>
                        <Video size={16} className="me-2" /> Start Camera
                      </Button>
                    </div>
                  </div>
                </Col>

                {/* RIGHT - join form */}
                <Col lg={6} xs={12}>
                  <div className="p-2">
                    <h5 className="mb-3">Ready to join?</h5>

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
                      <div className="d-flex gap-2">
                        <Form.Control value={safeMeetingId} readOnly />
                        <Button variant="outline-secondary" onClick={() => {
                          if (typeof copyMeetingLink === "function") {
                            copyMeetingLink();
                            setToastMessage && setToastMessage("Meeting link copied");
                            setTimeout(() => setToastMessage && setToastMessage(""), 2000);
                          }
                        }}>
                          <LinkIcon size={14} />
                        </Button>
                        <Button variant="outline-primary" onClick={() => {
                          if (typeof shareMeetingLink === "function") shareMeetingLink();
                        }}>
                          <Share2 size={14} />
                        </Button>
                      </div>

                      {toastMessage && (
                        <Alert variant="success" className="py-2 mt-2 mb-0 text-center">
                          {toastMessage}
                        </Alert>
                      )}
                    </Form.Group>

                    <Button
                      variant="primary"
                      className="w-100 mb-2"
                      disabled={!userName || !userName.trim()}
                      onClick={() => {
                        if (typeof handleJoinMeetingClick === "function") handleJoinMeetingClick();
                      }}
                    >
                      Join now
                    </Button>

                    <Button
                      variant="outline-secondary"
                      className="w-100 mt-2 d-flex justify-content-center align-items-center gap-2"
                      onClick={() => setSettingsOpen(true)}
                      style={{
                        borderColor: "#5f6368",
                        color: "#e0e0e0",
                        background: "transparent",
                      }}
                    >
                      <Settings size={16} />
                      <span>Audio & video settings</span>
                    </Button>

                    {/* render SettingsModal if provided */}
                    {SettingsModal ? (
                      // If SettingsModal is a React component, render it
                      <SettingsModal show={settingsOpen} onClose={() => setSettingsOpen(false)} />
                    ) : null}
                  </div>
                </Col>
              </Row>
            </Container>
          )}
        </Modal.Body>
      </Modal>

      {/* SEPARATE: Meeting Link Popup (OUTSIDE main modal) */}
      <Modal
        show={showMeetingLinkPopup}
        onHide={() => setShowMeetingLinkPopup(false)}
        centered
        size="md"
        style={{ zIndex: 2000 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Meeting ready</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
          <p className="mb-3">Here’s your meeting link — share it with others.</p>

          <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
            <Form.Control readOnly value={meetingUrl} />
            <Button
              onClick={() => {
                if (typeof copyMeetingLink === "function") copyMeetingLink();
                setToastMessage && setToastMessage("Meeting link copied");
                setTimeout(() => setToastMessage && setToastMessage(""), 2000);
              }}
            >
              Copy
            </Button>
          </div>

          {toastMessage && <Alert variant="success" className="py-2 mt-2 text-center">{toastMessage}</Alert>}

          <Button
            variant="primary"
            onClick={() => {
              if (typeof handleJoinMeetingClick === "function") handleJoinMeetingClick();
            }}
            className="w-100"
          >
            Join now
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
