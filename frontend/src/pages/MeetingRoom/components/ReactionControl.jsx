import React, { useState } from "react";
import "./ReactionControl.css";

const ReactionControl = () => {
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [floatingReactions, setFloatingReactions] = useState([]);

  const reactions = ["👍", "❤️", "😂", "👏", "😮", "🎉"];

  const handleReactionClick = (emoji) => {
    // Add the emoji to the floating animation list
    setFloatingReactions((prev) => [...prev, { id: Date.now(), emoji }]);
    setShowPicker(false);

    // Remove the emoji after animation ends
    setTimeout(() => {
      setFloatingReactions((prev) => prev.slice(1));
    }, 2000);
  };

  return (
    <div className="reaction-control position-relative d-inline-block">
      <button
        className="btn mx-2 d-flex justify-content-center align-items-center rounded-circle border-0"
        style={{ width: "48px", height: "48px", backgroundColor: "#f1f3f4" }}
        onClick={() => setShowPicker(!showPicker)}
      >
        <i className="bi bi-hand-thumbs-up text-dark fs-5"></i>
      </button>

      {/* Reaction Picker Popup */}
      {showPicker && (
        <div className="reaction-picker bg-white shadow p-2 rounded">
          {reactions.map((emoji, index) => (
            <span
              key={index}
              className="reaction-emoji-option"
              onClick={() => handleReactionClick(emoji)}
            >
              {emoji}
            </span>
          ))}
        </div>
      )}

      {/* Floating Emoji Animation */}
      {floatingReactions.map((r) => (
        <div key={r.id} className="reaction-emoji-float">
          {r.emoji}
        </div>
      ))}
    </div>
  );
};

export default ReactionControl;
