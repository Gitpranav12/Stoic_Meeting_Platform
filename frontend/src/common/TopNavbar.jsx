import React from "react";
import { motion } from "framer-motion";
import { Search, Bell } from "lucide-react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function TopNavbar({ active = "dashboard" }) {
  const navigate = useNavigate();

  const renderSearchBar = () => {
    if (active === "dashboard") {
      // Meetings search bar
      return (
        <InputGroup style={{ maxWidth: "400px" }}>
          <InputGroup.Text>
            <Search size={16} />
          </InputGroup.Text>
          <Form.Control placeholder="Search meetings, messages, or people..." />
        </InputGroup>
      );
    } else if (active === "chat") {
      // Chat search bar
      return (
        <div className="p-1 w-100" style={{ maxWidth: "400px" }}>
          <InputGroup>
            <InputGroup.Text>
              <Search size={16} />
            </InputGroup.Text>
            <Form.Control placeholder="Search messages..." />
          </InputGroup>
        </div>
      );
    } else {
      // Settings → empty space for consistent layout
      return (
        <div style={{ width: "400px" }}>
          <h3>Profile & Settings</h3>
        </div>
      );
    }
  };

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white border-bottom p-3 d-flex justify-content-between align-items-center"
    >
      {/* ✅ Always keep left section width consistent */}
      {renderSearchBar()}

      {/* 🔔 Notifications + Profile */}
      <div className="d-flex align-items-center gap-3">
        <Button
          variant="light"
          className="position-relative rounded-circle p-2"
        >
          <Bell size={18} />
          <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger rounded-circle"></span>
        </Button>

        <div
          className="bg-secondary text-white rounded-circle d-flex justify-content-center align-items-center"
          style={{ width: "36px", height: "36px", cursor: "pointer" }}
          onClick={() => navigate("/settings")}
        >
          JD
        </div>
      </div>
    </motion.div>
  );
}
