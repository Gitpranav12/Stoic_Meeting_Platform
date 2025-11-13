import React from "react";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";

export default function MessageItem({ msg, index }) {
  return msg.isOwn ? (
    <OutgoingMessage msg={msg} index={index} />
  ) : (
    <IncomingMessage msg={msg} index={index} />
  );
}
