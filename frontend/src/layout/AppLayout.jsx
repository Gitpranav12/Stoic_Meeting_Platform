import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import TopNavbar from "../common/TopNavbar";

export default function AppLayout() {
  const location = useLocation();

  // Determine active tab from the route
  const getActiveTab = () => {
    if (location.pathname.startsWith("/dashboard/chat")) return "chat";
    if (location.pathname.startsWith("/settings")) return "settings";
    return "dashboard";
  };

  const active = getActiveTab();

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* ✅ Fixed Sidebar */}
      <Sidebar active={active} />

      {/* ✅ Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column" style={{ overflow: "hidden" }}>
        {/* ✅ Fixed Top Navbar */}
        <TopNavbar active={active} />

        {/* ✅ Dynamic Page Content */}
        <div
          className="flex-grow-1 overflow-auto p-1"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <Outlet /> {/* This renders the page content dynamically */}
        </div>
      </div>
    </div>
  );
}
