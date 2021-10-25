import React from "react";
import Message from "./Message";
import MessengerInput from "./MessengerInput";

export default function Messenger() {
  return (
    <div className="chat__messenger d-flex flex-column">
      <Message self />
      <Message />
      <Message />
      <Message />
      <MessengerInput />
    </div>
  );
}
