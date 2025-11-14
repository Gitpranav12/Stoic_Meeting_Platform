import React, { useState , useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Bell, Menu } from "lucide-react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function TopNavbar({ active = "dashboard", onMenuClick }) {
  const navigate = useNavigate();

  const isTabletOrMobile = window.innerWidth <= 1024;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedUser);
  }, []);

  const initials = user?.fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("");


  const renderSearchBar = () => {
    if (active === "dashboard") {
      return (
        <div className="flex-grow-1">
          <InputGroup className="w-100">
            <InputGroup.Text>
              <Search size={16} />
            </InputGroup.Text>
            <Form.Control placeholder="Search meetings, messages, or people..." />
          </InputGroup>
        </div>
      );
    } else if (active === "chat") {
      return (
        <div className="flex-grow-1">
          <InputGroup className="w-100">
            <InputGroup.Text>
              <Search size={16} />
            </InputGroup.Text>
            <Form.Control placeholder="Search messages, or people..." />
          </InputGroup>
        </div>
      );
    } else {
      return (
        <div className="d-flex align-items-center" style={{ minWidth: 0 }}>
          <h5 className="mb-0 text-truncate">Profile & Settings</h5>
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
      <div className="d-flex align-items-center gap-3 flex-grow-1">
        {/* ✅ Updated — show for ALL devices <= 1024px */}
        {isTabletOrMobile && (
          <Button
            variant="light"
            className="rounded-circle p-2 shadow-sm"
            onClick={onMenuClick}
          >
            <Menu size={20} />
          </Button>
        )}

        {/* Search bar or title */}
        {renderSearchBar()}
      </div>

      {/* Notifications + Profile */}
      <div className="d-flex align-items-center gap-3 ms-3">
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
        {initials}
        </div>
      </div>
    </motion.div>
  );
}
