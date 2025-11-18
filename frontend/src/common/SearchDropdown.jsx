// src/common/SearchDropdown.jsx
import React from "react";
import { ListGroup, Spinner } from "react-bootstrap";

export default function SearchDropdown({
  loading,
  results,
  onUserClick,
  onMessageClick,
  onClose,
}) {
  const hasResults =
    (results.users?.length || 0) > 0 ||
    (results.messages?.length || 0) > 0;

  if (!hasResults) return null;

  return (
    <div
      className="position-absolute bg-white border rounded shadow-sm"
      style={{
        zIndex: 1050,
        width: "100%",
        marginTop: 6,
        maxHeight: 360,
        overflow: "auto",
      }}
    >
      {/* Loading */}
      {loading && (
        <div className="text-center p-3">
          <Spinner animation="border" size="sm" />
        </div>
      )}

      {/* Users */}
      {results.users?.length > 0 && (
        <>
          <div className="px-3 py-2 small text-muted">People</div>
          <ListGroup variant="flush">
            {results.users.map((u) => (
              <ListGroup.Item
                key={u._id || u.id}
                action
                onClick={() => {
                  onUserClick(u);
                  onClose();
                }}
                className="d-flex align-items-center"
              >
                <div
                  className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center me-3"
                  style={{ width: 36, height: 36 }}
                >
                  {(u.fullName || u.name || u.email || "U")
                    .toString()
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div>
                  <div className="fw-semibold">
                    {u.fullName || u.name || u.email}
                  </div>
                  <div className="small text-muted">{u.email}</div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}

      {/* Messages */}
      {results.messages?.length > 0 && (
        <>
          <div className="px-3 py-2 small text-muted">Messages</div>
          <ListGroup variant="flush">
            {results.messages.map((m) => (
              <ListGroup.Item
                key={m._id || m.id}
                action
                onClick={() => {
                  onMessageClick(m);
                  onClose();
                }}
              >
                <div className="small text-truncate" style={{ maxWidth: 520 }}>
                  <strong className="me-2 text-primary">
                    {m.senderName || m.user || ""}
                  </strong>
                  {(m.content || m.text || "").slice(0, 120)}
                </div>
                <div className="small text-muted">
                  {new Date(m.createdAt).toLocaleString()}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
    </div>
  );
}
