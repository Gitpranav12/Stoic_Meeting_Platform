import React, { useState } from "react";

const CameraControl = () => {
  const [cameraOn, setCameraOn] = useState(true);

  return (
    <button
      className="btn mx-2 d-flex justify-content-center align-items-center rounded-circle border-0"
      style={{
        width: "48px",
        height: "48px",
        backgroundColor: cameraOn ? "#f1f3f4" : "#ffcccc",
      }}
      onClick={() => setCameraOn(!cameraOn)}
    >
      <i
        className={`bi ${
          cameraOn ? "bi-camera-video text-dark" : "bi-camera-video-off text-danger"
        } fs-5`}
      ></i>
    </button>
  );
};

export default CameraControl;
