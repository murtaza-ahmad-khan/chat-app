import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Message from "./Message";
import MessengerInput from "./MessengerInput";

export default function Messenger({ messages, socket, currentChat }) {
  const {
    state: { user },
  } = useContext(AuthContext);

  const getPartner = () => {
    if (user.id === currentChat.user.id) {
      return currentChat.partner;
    }

    return currentChat.user;
  };

  const handleSubmitMessage = (message) => {
    const m = {
      chatId: currentChat.id,
      message,
      senderId: user.id,
      receiverId: getPartner().id,
      sender: user,
      partner: getPartner(),
    };
    socket.emit("message", m);
  };

  return (
    <div className="chat__messenger  d-flex flex-column">
      {messages.map((message) => {
        if (message.senderId === user.id) {
          return <Message message={message} self key={message.id.toString()} />;
        }

        return <Message message={message} key={message.id.toString()} />;
      })}

      {currentChat && (
        <MessengerInput socket={socket} onMessage={handleSubmitMessage} />
      )}
    </div>
  );
}
