import React, { useEffect, useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import api from "../../api/http";
import { Modal } from "react-bootstrap";
import "./css/ProfileSettings.css";

export default function ProfileCard() {

  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const fileRef = useRef();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/profile");
        setUser(res.data);
        setFullName(res.data.fullName || "");
        setEmail(res.data.email || "");
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const res = await api.put(
        "/api/profile",
        { fullName, email }
      );
      setUser(res.data);
      setModalMessage("Profile updated");
      setModalShow(true);
    } catch (err) {
      console.error(err);
      setModalMessage(err?.response?.data?.error || "Update failed");
      setModalShow(true);
    }
  };

  useEffect(() => {
    if (user) {
      setIsChanged(fullName !== user.fullName);
    }
  }, [fullName, user]);

  const handlePhotoClick = () => fileRef.current?.click();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append("avatar", file);
    try {
      const res = await api.post("/api/profile/photo", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // new avatar path returned
      setUser(prev => ({ ...prev, profilePhoto: res.data.profilePhoto }));
      setModalMessage("Profile photo updated");
      setModalShow(true);
    } catch (err) {
      console.error(err);
      setModalMessage(err?.response?.data?.error || "Upload failed");
      setModalShow(true);
    }
  };

  const profilePhotoUrl =
    user?.profilePhoto?.startsWith("http")
      ? user.profilePhoto
      : `${process.env.REACT_APP_API_URL || "http://localhost:5000"}${user?.profilePhoto}`;

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setFullName(value);
    }
  };

  const handleCancel = () => {
    if (!user) return;
    setFullName(user.fullName);
    setIsChanged(false);
  };

  return (
    <div className="card-p mb-4 shadow-sm">
      <div className="card-header-p bg-white my-1 p-3 mb-0">
        <h5 className="mb-0 fw-semibold">Profile Information</h5>
        <small className="text-muted">Update your personal details</small>
        {/* <hr class="border-2 border-dark mt-2 mb-0"></hr> */}
      </div>

      <div className="card-body">
        <hr class="border-2 border-dark mt-0"></hr>
        <div className="d-flex flex-wrap align-items-start gap-4 mx-3">
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
              onClick={handlePhotoClick}
            >
              <img
                src="/icons/camera.png"
                alt="Change profile"
                style={{ width: "16px", height: "16px" }}
              />
            </Button>
            <input
              type="file"
              ref={fileRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>

          {/* Form Section */}
          <div className="flex-grow-1" style={{ minWidth: "260px" }}>
            <Form>
              <div className="row mb-3">
                <div className="mb-3 mb-md-0">
                  <Form.Label className="fw-semibold small text-muted">
                    Full Name
                  </Form.Label>
                  <Form.Control value={fullName} onChange={handleNameChange} className="bg-light" />
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold small text-muted">
                  Email Address
                </Form.Label>
                <div className="d-flex align-items-center border rounded px-2 py-1 bg-light">
                  <img
                    src="/icons/email.png"
                    alt="Email icon"
                    className="me-2"
                    style={{ width: "16px", height: "16px", opacity: 0.7 }}
                  />
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />
                </div>
              </Form.Group>

              <div className="my-3">
                <Button type="button" onClick={handleSave} className="px-4 py-2 fw-semibold btn btn-primary" disabled={!isChanged}>
                  Save Changes
                </Button>
                <Button variant="outline-secondary" onClick={handleCancel} className="px-4 py-2 fw-semibold btn mx-2" disabled={!isChanged}>
                  Cancel
                </Button>
              </div>
            </Form>
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
