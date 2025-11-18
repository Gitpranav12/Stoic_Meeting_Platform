import { motion } from "framer-motion";
import { Badge } from "react-bootstrap";

export default function ChatListItem({
  chat,
  selectedChat,
  onSelect,
  avatarColor = "primary",
}) {

  const initials =
    (chat.name || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((n) => n[0])
      .slice(0, 2)
      .join("") || "?";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={() => onSelect(chat.id)}
      className={`p-3 rounded mb-2 border d-flex align-items-center ${
        selectedChat === chat.id
          ? "border-primary bg-primary-subtle"
          : "border-light bg-white"
      }`}
      style={{ cursor: "pointer" }}
    >
      {/* Left Side (Avatar + Text) */}
      <div className="d-flex align-items-start flex-grow-1">
        <div
          className={`bg-${avatarColor} text-white rounded-circle d-flex justify-content-center align-items-center me-3 flex-shrink-0`}
          style={{ width: "36px", height: "36px" }}
        >
          {initials}
        </div>

        <div className="flex-grow-1">
          <div className="d-flex justify-content-between">
            <strong>{chat.name}</strong>
            <small className="text-muted flex-shrink-0">{chat.time}</small>
          </div>
          <p
            className="text-muted small mb-0 text-truncate"
            style={{ maxWidth: "180px" }}
          >
            {chat.lastMessage}
          </p>
        </div>
      </div>

      {/* Right Side (Badge) */}
      {chat.unread > 0 && (
        <Badge
          bg="danger"
          pill
          className="ms-2 flex-shrink-0"
          style={{ height: "20px" }}
        >
          {chat.unread}
        </Badge>
      )}
    </motion.div>
  );
}
