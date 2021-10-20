import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000/chat", { autoConnect: false });

export default function Chat({ location }) {
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      socket.auth = { username: user.username, userId: user.id };
    }
    socket.connect();
    socket.on("onConnect", (socketId) => {
      console.log(socketId);
    });
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const { id: receiverId } = queryString.parse(location.search);

    socket.emit("message", { to: receiverId, from: user.id.toString(), text });

    setText("");
  };
  return (
    <div>
      <h2 className="mt-4 mb-4">Chat</h2>
      {messages.map((m) => (
        <div className="bg-light rounded-3 mb-2 p-3" key={m.text}>
          <div className="fs-6 text-info">{m.username}</div>
          {m.text}
        </div>
      ))}
      <form onSubmit={submitHandler}>
        <input
          className="form-control mb-3"
          placeholder="Enter Message"
          value={text}
          onChange={({ target: { value } }) => setText(value)}
        />

        <div className="d-grid">
          <button className="btn btn-primary" type="submit">
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
