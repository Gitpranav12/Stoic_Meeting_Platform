import React from "react";
import "./css/ProfileSettings.css";

export default function SwitchToggle({ checked, onChange }) {
  return (
    <div className="form-check form-switch ms-auto custom-switch">
      <input
        className="form-check-input shadow-sm"
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  );
}
