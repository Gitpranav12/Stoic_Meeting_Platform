import React from "react";
import { motion } from "framer-motion";
import { Button, Badge } from "react-bootstrap";
import {
  LayoutDashboard,
  Video,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import Logo from "./Logo";

export default function Sidebar({ active = "dashboard", onNavigate, onLogout }) {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white border-end p-3 d-flex flex-column"
      style={{ width: "250px" }}
    >
      {/* Logo */}
      <div className="mb-4 ps-2">
        <Logo size="sm" />
      </div>

      {/* Navigation Buttons */}
      <div className="flex-grow-1">
     
        {/* Meetings */}
        <Button
          variant="light"
          className={`w-100 text-start mb-2 d-flex align-items-center gap-2 ${
            active === "dashboard"
              ? "bg-primary-subtle text-primary fw-semibold"
              : ""
          }`}
          onClick={() => onNavigate("dashboard")}
        >
          <Video size={18} /> Meetings
        </Button>

        {/* Chat */}
        <Button
          variant="light"
          className={`w-100 text-start mb-2 d-flex align-items-center gap-2 position-relative ${
            active === "chat"
              ? "bg-primary-subtle text-primary fw-semibold"
              : ""
          }`}
          onClick={() => onNavigate("chat")}
        >
          <MessageSquare size={18} /> Chat
          <Badge bg="primary" pill className="ms-auto">
            3
          </Badge>
        </Button>

        {/* Settings */}
        <Button
          variant="light"
          className={`w-100 text-start mb-2 d-flex align-items-center gap-2 ${
            active === "settings"
              ? "bg-primary-subtle text-primary fw-semibold"
              : ""
          }`}
          onClick={() => onNavigate("settings")}
        >
          <Settings size={18} /> Settings
        </Button>
      </div>

      {/* Logout */}
      <div className="border-top pt-3">
        <Button
          variant="light"
          className="w-100 text-start text-danger d-flex align-items-center gap-2"
          onClick={onLogout}
        >
          <LogOut size={18} /> Logout
        </Button>
      </div>
    </motion.div>
  );
}
