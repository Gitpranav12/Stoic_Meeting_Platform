import React from "react";
import { motion } from "framer-motion";
import { Tab, Nav } from "react-bootstrap";
import GroupChats from "./GroupChats";
import PrivateChats from "./PrivateChats";
import "../TabCss/NavTabsStyle.css";

export default function ChatList({
  activeTab = "groups",
  setActiveTab = () => {},
  selectedChat,
  setSelectedChat,
  groupChats,
  privateChats,
}) {
  // ✅ Detect mobile viewport width
  const isMobile = window.innerWidth <= 1024;

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="bg-white border-end flex-shrink-0"
      // style={{ width: "320px" }}
      style={{
        width: isMobile ? "100%" : "320px", // 💥 full width on mobile
        borderRight: isMobile ? "none" : "1px solid #dee2e6", // cleaner look
      }}
    >
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Nav
          variant="tabs"
          className="px-3 py-3 nav-tabs-c"
          style={{
            display: "flex",
            width: "100%",
          }}
        >
          <Nav.Item style={{ flex: 1 }}>
            <Nav.Link
              eventKey="groups"
              className="nav-link-c text-center w-100"
            >
              Group Chat
            </Nav.Link>
          </Nav.Item>
          <Nav.Item style={{ flex: 1 }}>
            <Nav.Link
              eventKey="private"
              className="nav-link-c text-center w-100"
            >
              Private Chat
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content
          className="overflow-auto "
          style={{ height: "calc(100vh - 150px)" }}
        >
          <Tab.Pane eventKey="groups">
            <GroupChats
              groupChats={groupChats}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
            />
          </Tab.Pane>

          <Tab.Pane eventKey="private">
            <PrivateChats
              privateChats={privateChats}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
            />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </motion.div>
  );
}
