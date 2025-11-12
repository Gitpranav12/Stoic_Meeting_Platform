import React from "react";
import ProfileCard from "./ProfileCard";
import SettingsTabs from "./SettingsTabs";
import "./css/ProfileSettings.css";

export default function ProfileSettings() {
  return (
    <div className="d-flex min-vh-100 bg-light">
      <div className="flex-grow-1 d-flex flex-column">
        <div className="container py-4 profile-settings-container mx-3">
          <div className="text-start mb-4">
            {/* <h3>Profile & Settings</h3> ........ commented by Raj */} 
            <p className="text-muted mb-0">
              Manage your account and preferences
            </p>
          </div>

          <ProfileCard />
          <SettingsTabs />
        </div>
      </div>
    </div>
  );
}
