import React from "react";
import ChatListItem from "./ChatListItem";

export default function PrivateChats({ privateChats, selectedChat, setSelectedChat }) {
  return (
    <div className="p-3">
      {privateChats.map((chat) => (
        <ChatListItem
          key={chat.id}
          chat={chat}
          selectedChat={selectedChat}
          onSelect={setSelectedChat}
          avatarColor="secondary"
        />
      ))}
    </div>
  );
}
