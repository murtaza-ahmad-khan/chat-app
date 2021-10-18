import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function MessageForm() {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  });

  const submitHandler = (e) => {
    e.preventDefault();
    socket.emit("userMessage", userMessage);
    setUserMessage("");
  };

  return (
    <div className="container">
      {messages.map((m) => (
        <div className="bg-light rounded-3 mb-2 p-3" key={m}>
          {m}
        </div>
      ))}

      <form onSubmit={submitHandler}>
        <input
          className="form-control mb-3"
          placeholder="Enter Message"
          value={userMessage}
          onChange={({ target }) => setUserMessage(target.value)}
        />
        <div className="d-grid">
          <button className="btn btn-primary" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
