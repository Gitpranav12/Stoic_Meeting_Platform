import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SettingsControl = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const closeModal = () => setShowModal(false);

  return (
    <div className="d-inline-block">
      {/* Settings Button */}
      <button
        className="btn mx-2 d-flex justify-content-center align-items-center rounded-circle border-0"
        style={{ width: "48px", height: "48px", backgroundColor: "#f1f3f4" }}
        onClick={() => setShowModal(true)}
      >
        <i className="bi bi-gear text-dark fs-5"></i>
      </button>

      {/* Settings Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          }}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ maxWidth: "600px" }}
          >
            <div className="modal-content border-0 rounded-3 shadow-lg">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-semibold">Settings</h5>
                <button
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>

              {/* Tabs */}
              <ul className="nav nav-tabs px-3">
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeTab === "general" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("general")}
                  >
                    General
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeTab === "audio" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("audio")}
                  >
                    Audio
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeTab === "video" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("video")}
                  >
                    Video
                  </button>
                </li>
              </ul>

              {/* Tab Content */}
              <div className="modal-body">
                {activeTab === "general" && (
                  <div>
                    <h6 className="fw-semibold mb-3">General Settings</h6>
                    <div className="form-check form-switch mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="darkMode"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="darkMode"
                      >
                        Enable Dark Mode
                      </label>
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="notifications"
                        defaultChecked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="notifications"
                      >
                        Show Notifications
                      </label>
                    </div>
                  </div>
                )}

                {activeTab === "audio" && (
                  <div>
                    <h6 className="fw-semibold mb-3">Audio Settings</h6>
                    <div className="mb-3">
                      <label className="form-label">Microphone</label>
                      <select className="form-select">
                        <option>Default Microphone</option>
                        <option>External Mic</option>
                        <option>Bluetooth Mic</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Speaker</label>
                      <select className="form-select">
                        <option>Default Speaker</option>
                        <option>Headphones</option>
                        <option>Bluetooth Speaker</option>
                      </select>
                    </div>
                  </div>
                )}

                {activeTab === "video" && (
                  <div>
                    <h6 className="fw-semibold mb-3">Video Settings</h6>
                    <div className="mb-3">
                      <label className="form-label">Camera</label>
                      <select className="form-select">
                        <option>Default Camera</option>
                        <option>HD Webcam</option>
                        <option>External Camera</option>
                      </select>
                    </div>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="mirrorVideo"
                        defaultChecked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="mirrorVideo"
                      >
                        Mirror my video
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer border-0">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    closeModal();
                    alert("✅ Settings saved!");
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsControl;
