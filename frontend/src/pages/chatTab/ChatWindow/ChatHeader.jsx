// src/pages/chatTab/ChatHeader.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Dropdown } from "react-bootstrap";
import { Video, MoreVertical, ArrowLeft } from "lucide-react";

export default function ChatHeader({
  currentChat,
  onBack,
  isMobile,
  isOnline = false,
  lastSeen = null,
}) {
  // get current user id from localStorage (various possible shapes)
  const logged = (() => {
    try {
      const raw = localStorage.getItem("loggedInUser");
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (err) {
      return null;
    }
  })();
  const myId = logged?._id || logged?.id || null;

  // Utility: given a participant entry (could be id string or object), return readable name/email if present
  const participantDisplay = (p) => {
    if (!p) return null;
    if (typeof p === "string") {
      // p is an id string
      return null; // we cannot resolve id -> name here
    }
    if (typeof p === "object") {
      return p.name || p.fullName || p.email || p.username || null;
    }
    return null;
  };

  // Determine chat type and compute display name
  const computeDisplayName = () => {
    if (!currentChat) return "Chat";

    // if currentChat is a simple string id, we can't resolve name here
    if (typeof currentChat === "string") {
      return "Chat";
    }

    const type =
      currentChat.type ||
      (currentChat.participants && currentChat.participants.length > 2
        ? "group"
        : "private");

    // Group: prefer chat.name, else fall back to combined participant names
    if (type === "group") {
      if (currentChat.name) return currentChat.name;
      // try to build a group name from participants if available
      if (
        Array.isArray(currentChat.participants) &&
        currentChat.participants.length > 0
      ) {
        const names = currentChat.participants
          .map((p) => participantDisplay(p))
          .filter(Boolean)
          .slice(0, 3); // show up to 3 names
        if (names.length) return names.join(", ");
      }
      return "Group";
    }

    // Private chat: find the other participant (not me)
    if (type === "private") {
      if (Array.isArray(currentChat.participants)) {
        // participants could be [meObj, otherObj] or [meId, otherId] or mixed
        // find participant that is not me
        let other = null;
        // try match by id first
        for (let p of currentChat.participants) {
          if (!p) continue;
          if (typeof p === "string") {
            if (myId && String(p) === String(myId)) continue;
            // p is id of other, we can't resolve name here
            other = p;
            break;
          } else if (typeof p === "object") {
            const pid = p._id || p.id || null;
            if (myId && pid && String(pid) === String(myId)) continue;
            other = p;
            break;
          }
        }
        if (other) {
          const name = participantDisplay(other);
          if (name) return name;
          // maybe it's an id string, show partial id as fallback
          if (typeof other === "string")
            return `User ${String(other).slice(0, 6)}`;
          return "Unknown";
        }
      }

      // fallback: maybe backend stored lastMessage sender as name
      if (currentChat.name) return currentChat.name;

      return "Chat";
    }

    return "Chat";
  };

  const displayName = computeDisplayName();

  // initials: initials from displayName
  const initials =
    (displayName || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  const statusText = isOnline
    ? "Online"
    : lastSeen
    ? `Last seen ${timeAgo(lastSeen)}`
    : "Offline";

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white border-bottom p-3 d-flex justify-content-between align-items-center"
    >
      <div className="d-flex align-items-center gap-3">
        {/* Mobile Back Button */}
        {onBack && isMobile && (
          <Button variant="light" className="p-2 border-0" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
        )}

        <div
          className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
          style={{ width: "36px", height: "36px" }}
        >
          {initials}
        </div>
        <div>
          <h6 className="mb-0">{displayName || "Chat"}</h6>
          <small className="text-muted">
            {isOnline
              ? statusText
              : lastSeen
              ? statusText
              : currentChat?.time || "—"}
          </small>
        </div>
      </div>

      {/* Actions */}
      <div className="d-flex gap-2 align-items-center">
        <Button variant="outline-primary" className="d-flex align-items-center">
          <Video size={16} className="me-0 me-md-2" />
          <span className="d-none d-md-inline">Start Call</span>
        </Button>

        <Dropdown align="end">
          <Dropdown.Toggle
            as={Button}
            bsPrefix="no-caret"
            variant="outline-primary"
            className="p-2 border-0"
            style={{ boxShadow: "none" }}
          >
            <MoreVertical size={18} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item className="d-flex align-items-center gap-2">
              <i className="bi bi-bell-slash text-primary"></i>
              Mute Notifications
            </Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item className="d-flex align-items-center gap-2">
              <i className="bi bi-trash3 text-primary"></i>
              Clear Chat History
            </Dropdown.Item>

            <Dropdown.Item className="d-flex align-items-center gap-2">
              <i className="bi bi-x-circle text-primary"></i>
              Delete Conversation
            </Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item className="d-flex align-items-center gap-2">
              <i className="bi bi-box-arrow-up-right text-primary"></i>
              Export Chat
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </motion.div>
  );
}

function timeAgo(ts) {
  if (!ts) return null;
  const diff = Math.floor((Date.now() - ts) / 1000); // seconds
  if (diff < 10) return "just now";
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
