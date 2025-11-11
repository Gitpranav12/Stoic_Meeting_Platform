import React from "react";
import { FaCamera, FaEnvelope } from "react-icons/fa";
import { Button, Form } from "react-bootstrap";
import "./css/ProfileSettings.css"; // Reuse same stylesheet

export default function ProfileCard() {
  const profilePhotoUrl = "/images/default-avatar.png";
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-white my-1 p-3 mb-0">
        <h5 className="mb-0 fw-semibold">Profile Information</h5>
        <small className="text-muted">Update your personal details</small>
        <hr class="border-2 border-dark mt-2 mb-0"></hr>
      </div>
    
      <div className="card-body">
        <div className="d-flex flex-wrap align-items-start gap-4">
          {/* Avatar Section */}
          <div className="position-relative mx-auto mx-md-0">
            <img
                src={profilePhotoUrl}
                alt="avatar"
                className="rounded-circle profile-avatar"
                style={{ width: "112px", height: "112px", objectFit: "cover" }}
                onError={(e) => {
                  e.target.src = "/images/default-avatar.png";
                }}
              />
            <Button
              size="sm"
              className="profile-camera-btn shadow rounded-3"
              title="Change Profile Picture"
            >
              <FaCamera />
            </Button>
          </div>

          {/* Form Section */}
          <div className="flex-grow-1" style={{ minWidth: "260px" }}>
            <Form>
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <Form.Label className="fw-semibold small text-muted">
                    First Name
                  </Form.Label>
                  <Form.Control placeholder="John" className="bg-light" />
                </div>
                <div className="col-md-6">
                  <Form.Label className="fw-semibold small text-muted">
                    Last Name
                  </Form.Label>
                  <Form.Control placeholder="Doe" className="bg-light" />
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold small text-muted">
                  Email Address
                </Form.Label>
                <div className="d-flex align-items-center border rounded px-2 py-1 bg-light">
                  <FaEnvelope className="me-2 text-muted" />
                  <Form.Control
                    type="email"
                    placeholder="john.doe@example.com"
                    className="border-0 bg-light"
                  />
                </div>
              </Form.Group>

              <div className="mt-3 my-2">
                <Button type="button" className="px-4 py-2 fw-semibold btn btn-primary">
                  Save Changes
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
