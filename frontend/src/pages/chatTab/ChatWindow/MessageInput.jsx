import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Form, Badge } from "react-bootstrap";
import { Send, Paperclip, Smile, X } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

export default function MessageInput({
  message,
  setMessage,
  handleSendMessage,
}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const pickerRef = useRef(null);
  const fileInputRef = useRef(null);

  // // ✅ Close picker if user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Add emoji to input
  const handleEmojiClick = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji);
  };

  // ✅ Handle file selection
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      file,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    }));

    setSelectedFiles((prev) => [...prev, ...newFiles]);
    event.target.value = ""; // reset file input
  };

  // ✅ Remove single file
  const handleRemoveFile = (id) => {
    setSelectedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  // ✅ Trigger file picker
  const handleAttachmentClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white border-top p-3 position-relative"
    >
      {/* 📎 File Preview List (above input) */}
      {selectedFiles.length > 0 && (
        <div className="mb-2 d-flex flex-wrap gap-2 align-items-center">
          <Badge bg="secondary" className="py-2 px-3">
            {selectedFiles.length} file{selectedFiles.length > 1 ? "s" : ""}{" "}
            selected
          </Badge>
          {selectedFiles.map((file) => (
            <div
              key={file.id}
              className="d-flex align-items-center border rounded px-2 py-1 bg-light"
              style={{
                maxWidth: "120px",
                fontSize: "0.85rem",
              }}
            >
              {file.preview ? (
                <img
                  src={file.preview}
                  alt={file.name}
                  className="me-2 rounded"
                  style={{
                    width: "24px",
                    height: "24px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Paperclip size={14} className="me-2 text-muted" />
              )}
              <span
                className="text-truncate"
                style={{ maxWidth: "70px" }}
                title={file.name}
              >
                {file.name}
              </span>
              <Button
                variant="link"
                size="sm"
                className="p-0 ms-1 text-danger"
                onClick={() => handleRemoveFile(file.id)}
              >
                <X size={14} />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* 💬 Message Input Area */}
      <Form
        onSubmit={handleSendMessage}
        className="d-flex align-items-center gap-2"
      >
        {/* 📎 Attachment Button */}
        <div className="position-relative">
          <Button
            variant="light"
            type="button"
            onClick={handleAttachmentClick}
            className="d-flex align-items-center justify-content-center p-2"
            style={{ width: "38px", height: "38px" }}
          >
            <Paperclip size={18} />
          </Button>

          {/* ✅ Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            multiple
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
        </div>

        <Form.Control
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />

        {/* 😀 Emoji Button */}
        <div className="position-relative" ref={pickerRef}>
          <Button
            variant="light"
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          >
            <Smile size={18} />
          </Button>

          {showEmojiPicker && (
            <div
              className="position-absolute bottom-100 end-0 mb-2 shadow"
              style={{ zIndex: 20 }}
            >
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                width={300}
                height={400}
              />
            </div>
          )}
        </div>

        <Button variant="primary" type="submit">
          <Send size={18} />
        </Button>
      </Form>
    </motion.div>
  );
}
