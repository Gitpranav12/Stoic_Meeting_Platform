import React, { useEffect, useState } from "react";
import SwitchToggle from "./SwitchToggle";
import api from "../../api/http";
import "./css/ProfileSettings.css";

export default function NotificationsTab() {
  const [notifs, setNotifs] = useState({ email: true, push: true, sms: false });

  useEffect(() => {
    const f = async () => {
      try {
        const res = await api.get("/api/profile");
        setNotifs(res.data.notifications || notifs);
      } catch (e) { console.error(e); }
    };
    f();
  }, []);

  const update = async (partial) => {
    const merged = { ...notifs, ...partial };
    setNotifs(merged);
    try {
      await api.put("/api/profile/notifications", partial);
    } catch (err) {
      console.error(err);
      // handle revert if necessary
    }
  };

  return (
    <div className="preferences-container">
      {/* Email Notifications */}
      <div className="pref-item">
        <div className="d-flex align-items-center gap-3">
          <div className="pref-icon text-white">
            <img
              src="/icons/email-noti.png"
              alt="Change profile"
              style={{ width: "38px", height: "38px" }}
            />
          </div>
          <div>
            <h6 className="mb-0 fw-semibold">Email Notifications</h6>
            <small className="text-muted">
              Receive updates and alerts via email.
            </small>
          </div>
        </div>
        <SwitchToggle checked={notifs.email} onChange={(v)=>update({ email: v })} />
      </div>

      <hr />

      {/* Push Notifications */}
      <div className="pref-item">
        <div className="d-flex align-items-center gap-3">
          <div className="pref-icon text-white">
            <img
              src="/icons/push-noti.png"
              alt="Change profile"
              style={{ width: "38px", height: "38px" }}
            />
          </div>
          <div>
            <h6 className="mb-0 fw-semibold">Push Notifications</h6>
            <small className="text-muted">
              Stay informed with real-time app alerts.
            </small>
          </div>
        </div>
        <SwitchToggle checked={notifs.push} onChange={(v)=>update({ push: v })} />
      </div>

      <hr />

      {/* SMS Alerts */}
      <div className="pref-item">
        <div className="d-flex align-items-center gap-3">
          <div className="pref-icon text-white">
            <img
              src="/icons/sms-alerts.png"
              alt="Change profile"
              style={{ width: "38px", height: "38px" }}
            />
          </div>
          <div>
            <h6 className="mb-0 fw-semibold">SMS Alerts</h6>
            <small className="text-muted">
              Get text notifications for critical activities.
            </small>
          </div>
        </div>
        <SwitchToggle checked={notifs.sms} onChange={(v)=>update({ sms: v })} />
      </div>

    </div>
  );
}
