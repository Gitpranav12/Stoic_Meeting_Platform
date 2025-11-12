import React, { useState } from "react";
import SwitchToggle from "./SwitchToggle";
import "./css/ProfileSettings.css";

export default function PreferencesTab() {
  const [darkMode, setDarkMode] = useState(false);
  const [sound, setSound] = useState(true);
  const [cam, setCam] = useState(true);

  return (
    <div className="preferences-container">
      {/* Dark Mode */}
      <div className="pref-item">
        <div className="d-flex align-items-center gap-3">
          <div className="pref-icon text-white">
            <img
              src="/icons/dark-mode.png"
              alt="Change profile"
              style={{ width: "38px", height: "38px" }}
            />
          </div>
          <div>
            <h6 className="mb-0 fw-semibold">Dark Mode Preview</h6>
            <small className="text-muted">Preview meeting room in dark mode</small>
          </div>
        </div>
        <SwitchToggle checked={darkMode} onChange={setDarkMode} />
      </div>

      <hr />

      {/* Auto Join */}
      <div className="pref-item">
        <div className="d-flex align-items-center gap-3">
          <div className="pref-icon text-white">
            <img
              src="/icons/video-camera.png"
              alt="Change profile"
              style={{ width: "38px", height: "38px" }}
            />
          </div>
          <div>
            <h6 className="mb-0 fw-semibold">Auto-join with video on</h6>
            <small className="text-muted">Start meetings with camera enabled</small>
          </div>
        </div>
        <SwitchToggle checked={cam} onChange={setCam} />
      </div>

      <hr />

      {/* Sound Effects */}
      <div className="pref-item">
        <div className="d-flex align-items-center gap-3">
          <div className="pref-icon text-white">
            <img
              src="/icons/sound.png"
              alt="Change profile"
              style={{ width: "38px", height: "38px" }}
            />
          </div>
          <div>
            <h6 className="mb-0 fw-semibold">Sound Effects</h6>
            <small className="text-muted">Play sounds for notifications and actions</small>
          </div>
        </div>
        <SwitchToggle checked={sound} onChange={setSound} />
      </div>

    </div>
  );
}
