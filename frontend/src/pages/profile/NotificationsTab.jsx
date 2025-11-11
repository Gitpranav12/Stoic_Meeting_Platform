import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelopeOpenText, FaBell, FaMobileAlt } from "react-icons/fa";
import SwitchToggle from "./SwitchToggle";
import "./css/ProfileSettings.css";

export default function NotificationsTab() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  return (
    <div className="preferences-container">
      {/* Email Notifications */}
      <div className="pref-item">
        <div className="d-flex align-items-center gap-3">
          <div className="pref-icon bg-primary text-white">
            <FaEnvelopeOpenText />
          </div>
          <div>
            <h6 className="mb-0 fw-semibold">Email Notifications</h6>
            <small className="text-muted">
              Receive updates and alerts via email.
            </small>
          </div>
        </div>
        <SwitchToggle checked={emailNotif} onChange={setEmailNotif} />
      </div>

      <hr />

      {/* Push Notifications */}
      <div className="pref-item">
        <div className="d-flex align-items-center gap-3">
          <div className="pref-icon bg-success text-white">
            <FaBell />
          </div>
          <div>
            <h6 className="mb-0 fw-semibold">Push Notifications</h6>
            <small className="text-muted">
              Stay informed with real-time app alerts.
            </small>
          </div>
        </div>
        <SwitchToggle checked={pushNotif} onChange={setPushNotif} />
      </div>

      <hr />

      {/* SMS Alerts */}
      <div className="pref-item">
        <div className="d-flex align-items-center gap-3">
          <div className="pref-icon bg-warning text-white">
            <FaMobileAlt />
          </div>
          <div>
            <h6 className="mb-0 fw-semibold">SMS Alerts</h6>
            <small className="text-muted">
              Get text notifications for critical activities.
            </small>
          </div>
        </div>
        <SwitchToggle checked={smsNotif} onChange={setSmsNotif} />
      </div>

    </div>
  );
}
