import React from "react";

const MoreOptionsControl = () => {
  const handleMore = () => {
    alert("⋯ More options clicked!");
  };

  return (
    <button
      className="btn mx-2 d-flex justify-content-center align-items-center rounded-circle border-0"
      style={{ width: "48px", height: "48px", backgroundColor: "#f1f3f4" }}
      onClick={handleMore}
    >
      <i className="bi bi-three-dots text-dark fs-5"></i>
    </button>
  );
};

export default MoreOptionsControl;
