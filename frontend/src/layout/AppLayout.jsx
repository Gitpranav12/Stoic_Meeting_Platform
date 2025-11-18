import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import TopNavbar from "../common/TopNavbar";

import { connectSocket } from "../api/socket";

export default function AppLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);

      // Sidebar always open only on desktop (>1024)
      if (window.innerWidth > 1024) setIsSidebarOpen(true);
      else setIsSidebarOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getActiveTab = () => {
    if (location.pathname.startsWith("/dashboard/chat")) return "chat";
    if (location.pathname.startsWith("/settings")) return "settings";
    return "dashboard";
  };

  const active = getActiveTab();

  useEffect(() => {
    // connect socket once (if token exists)
    const token = localStorage.getItem("authToken");
    if (token) {
      const socket = connectSocket();
      socket.on("auth:ok", () => {
        // optional: console.log('socket auth ok');
      });
      socket.on("user:online", (data) => {
        // optional: handle presence globally
      });
    }
    // no cleanup here: keep socket for app lifetime
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex">
      {/* ✅ Sidebar */}
      <Sidebar
        active={active}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* ✅ Main Area */}
      <div
        className="flex-grow-1 d-flex flex-column"
        style={{
          marginLeft: isMobile ? "0px" : "250px",
          transition: "margin-left 0.3s ease",
          overflow: "hidden",
        }}
      >
        {/* ✅ Top Navbar with Menu Icon */}
        <TopNavbar active={active} onMenuClick={() => setIsSidebarOpen(true)} />

        {/* ✅ Page Content */}
        <div
          className="flex-grow-1 overflow-auto p-2"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
