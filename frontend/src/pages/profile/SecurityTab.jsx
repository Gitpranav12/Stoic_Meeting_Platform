import React from "react";
import { Form, Button } from "react-bootstrap";
import "./css/ProfileSettings.css";

export default function SecurityTab() {
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
                />
              </div>
            </Form.Group>

            <Button type="button" className="px-4 py-2 fw-semibold btn btn-primary">
              Update Password
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
    </div>
  );
}
