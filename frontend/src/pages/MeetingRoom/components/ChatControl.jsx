import React from "react";

const ChatControl = () => {
  const handleChat = () => {
    alert("💬 Chat window opened!");
  };

  return (
    <button
      className="btn mx-2 d-flex justify-content-center align-items-center rounded-circle border-0"
      style={{ width: "48px", height: "48px", backgroundColor: "#f1f3f4" }}
      onClick={handleChat}
    >
      <i className="bi bi-chat text-dark fs-5"></i>
    </button>
  );
};

export default ChatControl;
