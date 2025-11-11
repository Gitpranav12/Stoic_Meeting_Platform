import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import PreferencesTab from "./PreferencesTab";
import SecurityTab from "./SecurityTab";
import NotificationsTab from "./NotificationsTab";
import "./css/ProfileSettings.css"; // uses same stylesheet

export default function SettingsTabs() {
  const [key, setKey] = useState("preferences");

  return (
    <div>
      <Tabs
        id="settings-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="custom-tabs mb-4"
        justify
      >
        <Tab eventKey="preferences" title="Preferences">
          <div className="tab-content-card">
            <PreferencesTab />
          </div>
        </Tab>
        <Tab eventKey="security" title="Security">
          <div className="tab-content-card">
            <SecurityTab />
          </div>
        </Tab>
        <Tab eventKey="notifications" title="Notifications">
          <div className="tab-content-card">
            <NotificationsTab />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
