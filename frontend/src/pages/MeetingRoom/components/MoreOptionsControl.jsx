import React, { useState, useRef, useEffect } from "react";

const MoreOptionsControl = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="position-relative d-inline-block" ref={menuRef}>
      {/* Three dots button */}
      <button
        className="btn mx-2 d-flex justify-content-center align-items-center rounded-circle border-0"
        style={{
          width: "48px",
          height: "48px",
          backgroundColor: "#f1f3f4",
        }}
        onClick={toggleMenu}
      >
        <i className="bi bi-three-dots text-dark fs-5"></i>
      </button>

      {/* Popup menu */}
      {isOpen && (
        <div
          className="position-absolute p-2 shadow-lg"
          style={{
            right: "0",
            bottom: "60px",
            width: "260px",
            zIndex: 100,
            backgroundColor: "white", // changed to white background
            color: "black", // changed to black text
            borderRadius: "10px",
          }}
        >
          <div
            className="px-3 py-2 border-bottom"
            style={{ borderColor: "#e0e0e0" }}
          >
            <div className="fw-semibold text-black">Recording unavailable</div>
            <div className="small text-secondary">
              You’re not allowed to record this video call
            </div>
          </div>

          <button className="btn w-100 text-start text-black py-2" style={{ background: "none" }}>
            <i className="bi bi-grid-3x3-gap me-2"></i> Adjust view
          </button>
          <button className="btn w-100 text-start text-black py-2" style={{ background: "none" }}>
            <i className="bi bi-arrows-fullscreen me-2"></i> Full screen
          </button>
          <button className="btn w-100 text-start text-black py-2" style={{ background: "none" }}>
            <i className="bi bi-box-arrow-up-right me-2"></i> Open picture-in-picture
          </button>
          <button className="btn w-100 text-start text-black py-2" style={{ background: "none" }}>
            <i className="bi bi-image me-2"></i> Backgrounds and effects
          </button>

          <hr style={{ borderColor: "#3b3a3aff" }} />

          <button className="btn w-100 text-start text-black py-2" style={{ background: "none" }}>
            <i className="bi bi-chat-left-text me-2"></i> Report a problem
          </button>
          <button className="btn w-100 text-start text-black py-2" style={{ background: "none" }}>
            <i className="bi bi-exclamation-octagon me-2"></i> Report abuse
          </button>
          <button className="btn w-100 text-start text-black py-2" style={{ background: "none" }}>
            <i className="bi bi-life-preserver me-2"></i> Troubleshooting & help
          </button>
        </div>
      )}
    </div>
  );
};

export default MoreOptionsControl;
