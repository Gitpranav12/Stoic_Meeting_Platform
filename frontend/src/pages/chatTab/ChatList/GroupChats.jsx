import React from "react";
import ChatListItem from "./ChatListItem";

export default function GroupChats({ groupChats, selectedChat, setSelectedChat }) {
  return (
    <div className="p-3">
      {groupChats.map((chat) => (
        <ChatListItem
          key={chat.id}
          chat={chat}
          selectedChat={selectedChat}
          onSelect={setSelectedChat}
          avatarColor="primary"
        />
      ))}
    </div>
  );
}
