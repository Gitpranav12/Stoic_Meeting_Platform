import React from "react";
import ProfileCard from "./ProfileCard";
import SettingsTabs from "./SettingsTabs";
import Sidebar from "../../common/Sidebar"
import "./css/ProfileSettings.css";

export default function ProfileSettings({ active = "settings" }) {
  return (
    <div className="d-flex min-vh-100 bg-light">

      {/* ✅ Sidebar Component */}
      <Sidebar active={active} />
      <div className="flex-grow-1 d-flex flex-column">
        <div className="container py-4 profile-settings-container mx-3">
          <div className="text-start mb-4">
            <h3>Profile & Settings</h3>
            <p className="text-muted mb-0">Manage your account and preferences</p>
          </div>

          <ProfileCard />
          <SettingsTabs />
        </div>
      </div>
    </div>
  );
}
