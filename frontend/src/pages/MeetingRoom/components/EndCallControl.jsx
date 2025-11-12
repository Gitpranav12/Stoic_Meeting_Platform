import React from "react";

const EndCallControl = () => {
  const endCall = () => {
    if (window.confirm("Are you sure you want to end the call?")) {
      alert("📞 Call Ended!");
    }
  };

  return (
    <button
      className="btn mx-2 d-flex justify-content-center align-items-center rounded-circle border-0"
      style={{
        width: "48px",
        height: "48px",
        backgroundColor: "#dc3545",
      }}
      onClick={endCall}
    >
      <i className="bi bi-telephone-x text-white fs-5"></i>
    </button>
  );
};

export default EndCallControl;
