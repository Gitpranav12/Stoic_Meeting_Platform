import React, { useEffect, useState } from "react";
import SwitchToggle from "./SwitchToggle";
import api from "../../api/http";
import "./css/ProfileSettings.css";

export default function PreferencesTab() {
  const [prefs, setPrefs] = useState({
    darkMode: false,
    autoJoinWithVideo: true,
    soundEffects: true,
  });

  useEffect(() => {
    const fetchPref = async () => {
      try {
        const res = await api.get("/api/profile");
        setPrefs(res.data.preferences || prefs);
      } catch (err) { console.error(err); }
    };
    fetchPref();
  }, []);

  const update = async (partial) => {
    const newPrefs = { ...prefs, ...partial };
    setPrefs(newPrefs);
    try {
      await api.put("/api/profile/preferences", partial);
    } catch (err) {
      console.error(err);
      // optionally revert UI or show toast
    }
  };

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
        <SwitchToggle checked={prefs.darkMode} onChange={(v)=>update({ darkMode: v })} />
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
        <SwitchToggle checked={prefs.autoJoinWithVideo} onChange={(v)=>update({ autoJoinWithVideo: v })} />
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
        <SwitchToggle checked={prefs.soundEffects} onChange={(v)=>update({ soundEffects: v })} />
      </div>

    </div>
  );
}
