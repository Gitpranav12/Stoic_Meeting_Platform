import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import api from "../../api/http";
import "./css/ProfileSettings.css";
import { Modal } from "react-bootstrap";

export default function SecurityTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChangePassword = async () => {
    if (!passwordRegex.test(newPassword)) {
      setModalMessage(
        "Password must be at least 8 chars, include uppercase, lowercase, number, and special character."
      );
      return setModalShow(true);
    }
    if (newPassword !== confirmPassword) {
      setModalMessage("New Password and Confirm Password do not match");
      return setModalShow(true);
    }
    try {
      await api.put("/api/profile/change-password",
        { currentPassword, newPassword }
      );
      setModalMessage("Password updated");
      setModalShow(true);
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
    } catch (err) {
      setModalMessage(err?.response?.data?.error || "Update failed");
      setModalShow(true);
    }
  };

  const handleCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="security-container">
      <div className="border-0">
        <div className="card-body">
          <h5 className="fw-semibold mb-3">Password Management</h5>

          <Form>
            {/* Current Password */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small text-muted">
                Current Password
              </Form.Label>
              <div className="d-flex align-items-center border rounded px-2 py-1 bg-light">
                <img
                  src="/icons/lock.png"
                  alt="Email icon"
                  className="me-2"
                  style={{ width: "16px", height: "16px", opacity: 0.7 }}
                />
                <Form.Control
                  type="password"
                  placeholder="Enter current password"
                  className="border-0 bg-light"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
            </Form.Group>

            {/* New Password */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small text-muted">
                New Password
              </Form.Label>
              <div className="d-flex align-items-center border rounded px-2 py-1 bg-light">
                <img
                  src="/icons/lock.png"
                  alt="Email icon"
                  className="me-2"
                  style={{ width: "16px", height: "16px", opacity: 0.7 }}
                />
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  className="border-0 bg-light"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </Form.Group>

            {/* Confirm New Password */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold small text-muted">
                Confirm New Password
              </Form.Label>
              <div className="d-flex align-items-center border rounded px-2 py-1 bg-light">
                <img
                  src="/icons/lock.png"
                  alt="Email icon"
                  className="me-2"
                  style={{ width: "16px", height: "16px", opacity: 0.7 }}
                />
                <Form.Control
                  type="password"
                  placeholder="Confirm new password"
                  className="border-0 bg-light"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </Form.Group>

            <Button type="button" className="px-4 py-2 fw-semibold btn btn-primary" onClick={handleChangePassword}>
              Update Password
            </Button>
            <Button variant="outline-secondary" className="px-4 py-2 fw-semibold btn mx-2 my-1" onClick={handleCancel}>
              Cancel
            </Button>
          </Form>

          <hr className="my-4" />

          {/* Two Factor Section */}
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div className="d-flex align-items-center gap-3">
              <div className="pref-icon text-white">
                <img
                  src="/icons/shield.png"
                  alt="Change profile"
                  style={{ width: "38px", height: "38px" }}
                />
              </div>
              <div>
                <h6 className="fw-semibold mb-0">Two-Factor Authentication</h6>
                <small className="text-muted">
                  Add an extra layer of security to your account
                </small>
              </div>
            </div>
            <Button variant="outline-secondary" className="fw-semibold">
              Enable
            </Button>
          </div>
        </div>
      </div>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold text-primary d-flex align-items-center gap-2">
            <i className="bi bi-info-circle-fill"></i> Notification
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="fs-6 text-secondary">
          {modalMessage}
        </Modal.Body>

        <Modal.Footer className="border-0 pt-0">
          <Button
            variant="primary"
            className="px-4 py-2 w-100 rounded-3 shadow-sm"
            onClick={() => setModalShow(false)}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
