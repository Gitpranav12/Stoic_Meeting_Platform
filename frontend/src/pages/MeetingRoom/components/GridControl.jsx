import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const GridControl = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [layout, setLayout] = useState("Auto");

  const layoutOptions = [
    { name: "Auto", icon: "magic" },
    { name: "Tiled", icon: "grid" },
    { name: "Spotlight", icon: "person-video3" },
    { name: "Sidebar", icon: "layout-sidebar" },
  ];

  const handleLayoutSelect = (option) => {
    setLayout(option.name);
    setShowMenu(false);
    alert(`🔲 Layout changed to ${option.name}`);
  };

  return (
    <div className="position-relative d-inline-block">
      {/* Grid Button */}
      <button
        className="btn mx-2 d-flex justify-content-center align-items-center rounded-circle border-0"
        style={{
          width: "48px",
          height: "48px",
          backgroundColor: "#f1f3f4",
        }}
        onClick={() => setShowMenu(!showMenu)}
      >
        <i className="bi bi-grid text-dark fs-5"></i>
      </button>

      {/* Layout Menu (Bootstrap dropdown style) */}
      {showMenu && (
        <div
          className="position-absolute bg-white shadow rounded p-2"
          style={{
            bottom: "60px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "200px",
            zIndex: 1050,
          }}
        >
          <div className="px-2 pb-1 text-muted small fw-semibold">
            Choose layout
          </div>

          {layoutOptions.map((option, index) => (
            <div
              key={index}
              className={`d-flex align-items-center p-2 rounded ${
                layout === option.name ? "bg-light fw-semibold" : ""
              }`}
              role="button"
              onClick={() => handleLayoutSelect(option)}
            >
              <i className={`bi bi-${option.icon} me-2 text-secondary`}></i>
              <span>{option.name}</span>
              {layout === option.name && (
                <i className="bi bi-check2 ms-auto text-success"></i>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GridControl;
