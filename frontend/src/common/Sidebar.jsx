import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Badge } from "react-bootstrap";
import { Video, MessageSquare, Settings, LogOut, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

export default function Sidebar({ active = "dashboard", isOpen, setIsOpen }) {
  const navigate = useNavigate();

  // ✅ Keep sidebar visible on desktop
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
      if (window.innerWidth >= 768) setIsOpen(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen]);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  const handleNav = (path) => {
    navigate(path);
    if (!isDesktop) setIsOpen(false); // ✅ auto close on mobile
  };

  return (
    <>
      {/* ✅ Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: isOpen || isDesktop ? 0 : -260,
          opacity: isOpen || isDesktop ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="bg-white border-end p-3 d-flex flex-column position-fixed top-0 start-0 h-100 shadow-sm"
        style={{
          width: "250px",
          zIndex: 1045,
        }}
      >
        {/* ✅ Mobile Header with Close Button */}
        <div className="d-flex justify-content-between align-items-center mb-3 d-md-none">
          <Logo size="sm" />
          <Button
            variant="light"
            size="sm"
            className="rounded-circle"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </Button>
        </div>

        {/* ✅ Desktop Logo */}
        <div className="mb-4 ps-2 d-none d-md-block">
          <Logo size="sm" />
        </div>

        {/* ✅ Navigation */}
        <div className="flex-grow-1">
          <Button
            variant="light"
            className={`w-100 text-start mb-2 d-flex align-items-center gap-2 ${
              active === "dashboard"
                ? "bg-primary-subtle text-primary fw-semibold"
                : ""
            }`}
            onClick={() => handleNav("/dashboard")}
          >
            <Video size={18} /> Meetings
          </Button>

          <Button
            variant="light"
            className={`w-100 text-start mb-2 d-flex align-items-center gap-2 position-relative ${
              active === "chat"
                ? "bg-primary-subtle text-primary fw-semibold"
                : ""
            }`}
            onClick={() => handleNav("/dashboard/chat")}
          >
            <MessageSquare size={18} /> Chat
            <Badge bg="primary" pill className="ms-auto">
              3
            </Badge>
          </Button>

          <Button
            variant="light"
            className={`w-100 text-start mb-2 d-flex align-items-center gap-2 ${
              active === "settings"
                ? "bg-primary-subtle text-primary fw-semibold"
                : ""
            }`}
            onClick={() => handleNav("/settings")}
          >
            <Settings size={18} /> Settings
          </Button>
        </div>

        {/* ✅ Logout */}
        <div className="border-top pt-3">
          <Button
            variant="light"
            className="w-100 text-start text-danger d-flex align-items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut size={18} /> Logout
          </Button>
        </div>
      </motion.div>

      {/* ✅ Overlay (for mobile only) */}
      {isOpen && !isDesktop && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-25 d-md-none"
          style={{ zIndex: 1040 }}
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
