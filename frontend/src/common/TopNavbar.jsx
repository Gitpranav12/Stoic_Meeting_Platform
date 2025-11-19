// src/common/TopNavbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Search, Bell, Menu } from "lucide-react";
import { Button, Form, InputGroup, ListGroup, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { openPrivateChat } from "../api/uiHelpers"; // adjust path if necessary
import searchService from "../api/searchService";
import CreateGroupModal from "./CreateGroupModal"; // adjust relative path if needed
import SearchDropdown from "./SearchDropdown";

export default function TopNavbar({ active = "dashboard", onMenuClick }) {
  const navigate = useNavigate();
  const isTabletOrMobile = window.innerWidth <= 1024;
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const [user, setUser] = useState(null);
  useEffect(() => {
    const loggedUser = JSON.parse(
      localStorage.getItem("loggedInUser") || "null"
    );
    setUser(loggedUser);
  }, []);

  const initials = (user?.fullName || user?.name || "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Search state
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({ users: [], messages: [] });
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef(null);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // adjust placeholder depending on active tab
  const placeholder =
    active === "dashboard"
      ? "Search meetings, messages, or people..."
      : "Search messages, or people...";

  useEffect(() => {
    // close dropdown when clicking outside
    const onDocClick = (e) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const runSearch = async (q) => {
    if (!q || q.trim().length < 1) {
      setResults({ users: [], messages: [] });
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await searchService.search(q);
      // expected shape: { users: [], messages: [] }
      const me = JSON.parse(localStorage.getItem("loggedInUser") || "null");
      const myId = me?._id || me?.id || null;

      setResults({
        users: Array.isArray(res.users)
          ? res.users.filter((u) => String(u._id || u.id) !== String(myId))
          : [],
        messages: Array.isArray(res.messages) ? res.messages : [],
      });
    } catch (err) {
      console.error("Search failed", err);
      setResults({ users: [], messages: [] });
    } finally {
      setLoading(false);
    }
  };

  // handle typed input with debounce
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query || query.trim().length < 1) {
      setResults({ users: [], messages: [] });
      setShowDropdown(false);
      return;
    }
    debounceRef.current = setTimeout(() => {
      runSearch(query);
      setShowDropdown(true);
    }, 300); // 300ms debounce
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // click user result -> open private chat
  const handleUserClick = async (userObj) => {
    try {
      const userId = userObj._id || userObj.id;
      if (!userId) {
        alert("User id not found");
        return;
      }
      await openPrivateChat(userId);

      // navigate to chat page IMMEDIATELY
      navigate("/dashboard/chat");

      // refresh chat list and auto-select the stored chat id
      if (window.__refreshChats) window.__refreshChats();

      setShowDropdown(false);
      setQuery("");
    } catch (err) {
      console.error(err);
      alert(
        "Failed to open chat: " + (err.response?.data?.error || err.message)
      );
    }
  };

  // // click message result -> open that chat
  // const handleMessageClick = (msg) => {
  //   const chatId =
  //     (msg.chatId && (msg.chatId._id || msg.chatId)) || msg.chat || msg.room;
  //   if (!chatId) {
  //     alert("Chat id not available for this message");
  //     return;
  //   }
  //   localStorage.setItem("stoic_select_chat", String(chatId));
  //   if (window.__refreshChats) window.__refreshChats();
  //   setShowDropdown(false);
  //   setQuery("");
  // };

  // robust extractor + opener for message search clicks
const getChatIdFromMessage = (m) => {
  if (!m) return null;

  // common variations: m.chatId (string), m.chatId._id (object), m.chat (object/string), m.room
  const cid =
    (m.chatId && (m.chatId._id || m.chatId)) ||
    (m.chat && (m.chat._id || m.chat)) ||
    m.room ||
    null;

  // If it's an object and has _id, return _id
  if (typeof cid === "object" && cid !== null) {
    return cid._id || cid.id || null;
  }
  return cid ? String(cid) : null;
};

const handleMessageClick = async (m) => {
  try {
    const chatId = getChatIdFromMessage(m);

    if (chatId) {
      // store + refresh + event + navigate (same pattern as openPrivateChat)
      localStorage.setItem("stoic_select_chat", String(chatId));
      if (window.__refreshChats) window.__refreshChats();

      // dispatch openChat event so mounted ChatDashboard will react immediately
      try {
        window.dispatchEvent(new CustomEvent("openChat", { detail: { chatId: String(chatId) } }));
      } catch (e) {
        const ev = document.createEvent("CustomEvent");
        ev.initCustomEvent("openChat", true, true, { chatId: String(chatId) });
        window.dispatchEvent(ev);
      }

      // ensure the dashboard route is visible
      navigate("/dashboard/chat");

      // close dropdown + clear query
      setShowDropdown(false);
      setQuery("");
      return;
    }

    // fallback: maybe message only has sender id; try opening a private chat with sender
    const senderId = (m.sender && (m.sender._id || m.sender)) || m.senderId || m.from || null;
    if (senderId) {
      // open or create private chat with message sender
      await openPrivateChat(senderId._id ? senderId._id : senderId);
      navigate("/dashboard/chat");
      setShowDropdown(false);
      setQuery("");
      return;
    }

    alert("Could not locate chat for this message.");
  } catch (err) {
    console.error("handleMessageClick error:", err);
    alert("Failed to open chat for message: " + (err?.message || err));
  }
};


  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowDropdown(false);
      inputRef.current?.blur();
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white border-bottom p-3 d-flex justify-content-between align-items-center"
    >
      <div className="d-flex align-items-center gap-3 flex-grow-1">
        {isTabletOrMobile && (
          <Button
            variant="light"
            className="rounded-circle p-2 shadow-sm"
            onClick={onMenuClick}
          >
            <Menu size={20} />
          </Button>
        )}

        {/* Search bar */}
        <div className="flex-grow-1 position-relative">
          <InputGroup className="w-100">
            <InputGroup.Text>
              <Search size={16} />
            </InputGroup.Text>
            <Form.Control
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={placeholder}
              aria-label="Search"
              autoComplete="off"
            />
            {loading && (
              <InputGroup.Text style={{ width: 36 }}>
                <Spinner animation="border" size="sm" />
              </InputGroup.Text>
            )}
          </InputGroup>

          {/* Dropdown results */}
          {showDropdown && (
            <SearchDropdown
              loading={loading}
              results={results}
              onUserClick={handleUserClick}
              onMessageClick={handleMessageClick}
              onClose={() => {
                setShowDropdown(false);
                setQuery("");
              }}
            />
          )}
        </div>
      </div>

      <div className="d-flex align-items-center gap-3 ms-3">
        {/* <Button
          variant="light"
          className="position-relative rounded-circle p-2"
        >
          <Bell size={18} />
          <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger rounded-circle"></span>
        </Button> */}
        <Button
          variant="light"
          className="position-relative rounded-circle p-2"
          onClick={() => setShowCreateGroup(true)}
        >
          <i className="bi bi-people" />
        </Button>

        <div
          className="bg-secondary text-white rounded-circle d-flex justify-content-center align-items-center"
          style={{ width: "36px", height: "36px", cursor: "pointer" }}
          onClick={() => navigate("/settings")}
        >
          {initials}
        </div>
      </div>

      <CreateGroupModal
        show={showCreateGroup}
        onClose={() => setShowCreateGroup(false)}
      />
    </motion.div>
  );
}
