import React, { useState } from "react";

const MicControl = () => {
  const [muted, setMuted] = useState(false);

  return (
    <button
      className="btn mx-2 d-flex justify-content-center align-items-center rounded-circle border-0"
      style={{
        width: "48px",
        height: "48px",
        backgroundColor: muted ? "#ffcccc" : "#f1f3f4",
      }}
      onClick={() => setMuted(!muted)}
    >
      <i
        className={`bi ${muted ? "bi-mic-mute text-danger" : "bi-mic text-dark"} fs-5`}
      ></i>
    </button>
  );
};

export default MicControl;
