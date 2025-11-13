import React, { useEffect, useRef } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Camera,
  Settings,
  Share2,
  Link as LinkIcon,
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
  handleJoinMeetingClick,
  settingsOpen,
  setSettingsOpen,
  SettingsModal,
}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      style={{ zIndex: 1050 }}
    >
      {/* Header */}
      <Modal.Header
        closeButton
        style={{ background: "#1e2428ff", color: "#fff" }}
      >
        <Modal.Title>Start New Meeting</Modal.Title>
      </Modal.Header>

      {/* Modal Body */}
      <Modal.Body
        className="p-4"
        style={{ background: "#2b3033ff", color: "#fff" }}
      >
        <div className="row">
          {/* ================== LEFT SIDE - CAMERA PREVIEW ================== */}
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

            {/* Camera Controls */}
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

          {/* ================== RIGHT SIDE - JOIN FORM ================== */}
          <div className="col-lg-6 p-4">
            <h5 className="mb-3">Ready to join?</h5>

            {/* User name */}
            <Form.Group className="mb-3">
              <Form.Label>Your name</Form.Label>
              <Form.Control
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>

            {/* Meeting ID + Copy/Share */}
            <Form.Group className="mb-3">
              <Form.Label>Meeting ID</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control value={meetingId} readOnly />
                <Button variant="outline-secondary" onClick={copyMeetingLink}>
                  <LinkIcon size={14} />
                </Button>
                <Button variant="outline-primary" onClick={shareMeetingLink}>
                  <Share2 size={14} />
                </Button>
              </div>

              {/* Toast feedback */}
              {toastMessage && (
                <Alert variant="success" className="py-2 mt-2 mb-0 text-center">
                  {toastMessage}
                </Alert>
              )}
            </Form.Group>

            {/* Join Now */}
            <Button
              variant="primary"
              className="w-100 mb-2"
              disabled={!userName.trim()}
              onClick={handleJoinMeetingClick}
            >
              Join now
            </Button>

            {/* Settings Button */}
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

            {/* Settings Modal */}
            <SettingsModal show={settingsOpen} onClose={() => setSettingsOpen(false)} />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
