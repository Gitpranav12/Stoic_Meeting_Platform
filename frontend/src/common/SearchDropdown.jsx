// src/common/SearchDropdown.jsx
import React, { useEffect, useRef, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { ListGroup, Spinner } from "react-bootstrap";

/**
 * SearchDropdown
 * Props:
 * - loading, results, onUserClick, onMessageClick, onClose
 * - optional: query (string) - used to highlight matched text
 */
export default function SearchDropdown({
  loading,
  results = {},
  onUserClick,
  onMessageClick,
  onClose,
  query = "",
}) {
  const containerRef = useRef(null);
  const listRef = useRef(null);

  // Flattened list for keyboard navigation
  const flattened = useMemo(() => {
    const flat = [];
    (results.users || []).forEach((u, i) =>
      flat.push({ kind: "user", idx: i, item: u })
    );
    (results.messages || []).forEach((m, i) =>
      flat.push({ kind: "message", idx: i, item: m })
    );
    return flat;
  }, [results]);

  const [activeIndex, setActiveIndex] = useState(flattened.length ? 0 : -1);

  // Sync activeIndex if flattened changes
  useEffect(() => {
    setActiveIndex(flattened.length ? 0 : -1);
  }, [flattened.length]);

  // Close on click outside or Escape key
  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        onClose?.();
      }
    }
    function handleKey(e) {
      if (e.key === "Escape") {
        onClose?.();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % (flattened.length || 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex(
          (i) => (i - 1 + (flattened.length || 1)) % (flattened.length || 1)
        );
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (activeIndex >= 0 && flattened[activeIndex]) {
          const { kind, item } = flattened[activeIndex];
          if (kind === "user") onUserClick?.(item);
          else onMessageClick?.(item);
          onClose?.();
        }
      }
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [flattened, activeIndex, onUserClick, onMessageClick, onClose]);

  // Ensure active item is visible
  useEffect(() => {
    if (listRef.current && activeIndex >= 0) {
      const el =
        listRef.current.querySelectorAll("[data-search-item]")[activeIndex];
      if (el && el.scrollIntoView) {
        // only if not fully visible
        const parent = listRef.current;
        const parentRect = parent.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        if (elRect.top < parentRect.top || elRect.bottom > parentRect.bottom) {
          el.scrollIntoView({ block: "nearest" });
        }
      }
    }
  }, [activeIndex]);

  const hasResults =
    (results.users?.length || 0) + (results.messages?.length || 0) > 0;
  if (!hasResults && !loading) return null;

  // helpers
  function initialsFor(u) {
    const name = u.fullName || u.name || u.email || "";
    const parts = name.toString().trim().split(/\s+/);
    const two =
      (parts[0] || "").slice(0, 1) + ((parts[1] || "").slice(0, 1) || "");
    return two.toUpperCase() || "U";
  }

  function safeText(str) {
    return (str || "").toString();
  }

  function highlight(text = "", q = "") {
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    const before = text.slice(0, idx);
    const match = text.slice(idx, idx + q.length);
    const after = text.slice(idx + q.length);
    return (
      <>
        {before}
        <mark
          className="px-1 rounded"
          style={{ backgroundColor: "rgba(255,235,59,0.35)" }}
        >
          {match}
        </mark>
        {after}
      </>
    );
  }

  function formatRelative(dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const diff = Date.now() - date.getTime();
    const seconds = Math.round(diff / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (seconds < 60) return `${seconds}s`;
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    // fallback to localized short date
    return date.toLocaleDateString();
  }

  // inline styles (could be moved to CSS file)
  const containerStyle = {
    zIndex: 1050,
    width: "100%",
    marginTop: 6,
    maxHeight: 360,
  };

  return (
    <div
      ref={containerRef}
      className="position-absolute bg-white border rounded shadow-sm"
      style={containerStyle}
      role="dialog"
      aria-label="Search results"
    >
      <style>{`
        .sd-header { position: sticky; top: 0; background: white; z-index: 2; }
        .sd-item-active { background-color: #f1f5fb; }
        .sd-avatar { width:36px; height:36px; border-radius:50%; object-fit:cover; }
        .sd-mark { background-color: rgba(255,235,59,0.35); padding: 0 .15rem; border-radius: .2rem; }
      `}</style>

      {/* Loading */}
      {loading && (
        <div className="text-center p-3 border-bottom">
          <Spinner animation="border" size="sm" />
        </div>
      )}

      <div ref={listRef} style={{ overflowY: "auto", maxHeight: 300 }}>
        {/* People */}
        {results.users?.length > 0 && (
          <>
            <div className="px-3 py-2 small text-muted sd-header">People</div>
            <ListGroup variant="flush" role="listbox" aria-label="People">
              {results.users.map((u, i) => {
                const index = flattened.findIndex(
                  (f) => f.kind === "user" && f.idx === i
                );
                const isActive = index === activeIndex;
                return (
                  <ListGroup.Item
                    key={u._id || u.id || `user-${i}`}
                    action
                    role="option"
                    aria-selected={isActive}
                    data-search-item
                    className={`d-flex align-items-center ${
                      isActive ? "sd-item-active" : ""
                    }`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => {
                      onUserClick?.(u);
                      onClose?.();
                    }}
                  >
                    {/* Avatar */}
                    <div
                      className="me-3 d-flex align-items-center justify-content-center"
                      style={{ width: 44 }}
                    >
                      {u.avatar ? (
                        <img
                          src={u.avatar}
                          alt={u.fullName || u.name || "avatar"}
                          className="sd-avatar"
                        />
                      ) : (
                        <div
                          className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center"
                          style={{ width: 36, height: 36 }}
                        >
                          <small className="fw-bold">{initialsFor(u)}</small>
                        </div>
                      )}
                    </div>

                    <div className="flex-grow-1">
                      <div className="fw-semibold">
                        {query
                          ? highlight(
                              safeText(u.fullName || u.name || u.email),
                              query
                            )
                          : u.fullName || u.name || u.email}
                      </div>
                      <div className="small text-muted">{u.email}</div>
                    </div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </>
        )}

        {/* Messages */}
        {results.messages?.length > 0 && (
          <>
            <div className="px-3 py-2 small text-muted sd-header">Messages</div>
            <ListGroup variant="flush" role="listbox" aria-label="Messages">
              {results.messages.map((m, i) => {
                const index = flattened.findIndex(
                  (f) => f.kind === "message" && f.idx === i
                );
                const isActive = index === activeIndex;
                // robust sender extraction
                const sender =
                  // explicit fields first
                  m.senderName ||
                  m.user ||
                  // sometimes the API populates `sender` object
                  (m.sender &&
                    (m.sender.name ||
                      m.sender.fullName ||
                      m.sender.full_name)) ||
                  // sometimes the populated info is under senderId
                  (m.senderId &&
                    (m.senderId.name ||
                      m.senderId.fullName ||
                      m.senderId.full_name)) ||
                  // some systems use `from`
                  (m.from &&
                    (m.from.name || m.from.fullName || m.from.email)) ||
                  // fallback to email or a small id slice
                  m.email ||
                  m.userEmail ||
                  null ||
                  // last-resort: try to infer from chat participants
                  (m.chat &&
                  m.chat.participants &&
                  Array.isArray(m.chat.participants)
                    ? (() => {
                        const first = m.chat.participants[0];
                        return (
                          (first &&
                            (first.name || first.fullName || first.email)) ||
                          null
                        );
                      })()
                    : null) ||
                  "Unknown";

                const text = safeText(m.content || m.text || "");
                return (
                  <ListGroup.Item
                    key={m._id || m.id || `msg-${i}`}
                    action
                    role="option"
                    aria-selected={isActive}
                    data-search-item
                    className={`${isActive ? "sd-item-active" : ""}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => {
                      onMessageClick?.(m);
                      onClose?.();
                    }}
                  >
                    <div className="d-flex justify-content-between">
                      <div style={{ maxWidth: 520 }}>
                        <div className="small text-truncate">
                          <strong className="me-2 text-primary">
                            {query ? highlight(sender, query) : sender}
                          </strong>
                          {query ? highlight(text, query) : text}
                        </div>
                      </div>
                      <div
                        className="small text-muted ms-2"
                        title={new Date(m.createdAt).toLocaleString()}
                      >
                        {formatRelative(m.createdAt)}
                      </div>
                    </div>
                    {m.previewMeta && (
                      <div className="small text-muted mt-1 text-truncate">
                        {m.previewMeta}
                      </div>
                    )}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </>
        )}

        {/* No results */}
        {!loading && !hasResults && (
          <div className="p-3 text-center small text-muted">No results</div>
        )}
      </div>
    </div>
  );
}

SearchDropdown.propTypes = {
  loading: PropTypes.bool,
  results: PropTypes.shape({
    users: PropTypes.array,
    messages: PropTypes.array,
  }),
  onUserClick: PropTypes.func,
  onMessageClick: PropTypes.func,
  onClose: PropTypes.func,
  query: PropTypes.string,
};
