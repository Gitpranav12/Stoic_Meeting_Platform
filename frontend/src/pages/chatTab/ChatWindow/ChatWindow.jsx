import ChatHeader from "./ChatHeader";
import MessageList from "./message/MessageList";
import MessageInput from "./MessageInput";

export default function ChatWindow({
  currentChat,
  messages,
  message,
  setMessage,
  isTyping,
  handleSendMessage,
  onBack,
}) {
  return (
    <div
      className="flex-grow-1 d-flex flex-column position-relative"
      style={{
        height: "100vh", // full height for layout control
        overflow: "hidden", // prevent page scroll
      }}
    >
      {/* ✅ Fixed Header */}
      <div
        className="position-sticky top-0 bg-white border-bottom"
        style={{ zIndex: 10 }}
      >
        <ChatHeader currentChat={currentChat} onBack={onBack} />
      </div>

      {/* ✅ Scrollable Message List */}
      <div
        className="flex-grow-1 overflow-auto"
        style={{
          padding: "1rem",
          backgroundColor: "#f8f9fa",
        }}
      >
        <MessageList messages={messages} isTyping={isTyping} />
      </div>

      {/* ✅ Fixed Input */}
      <div
        className="position-sticky bottom-0 bg-white border-top"
        style={{ zIndex: 10 }}
      >
        <MessageInput
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}
