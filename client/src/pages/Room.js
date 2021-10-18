import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Room({ location }) {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [users, setUsers] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();

    socket.emit("userMessage", userMessage);
    setUserMessage("");
  };

  useEffect(() => {
    const { username, roomName } = location.state;

    socket.emit("joinRoom", { username, roomName });
  }, [location.state]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("users", (roomUsers) => {
      setUsers(roomUsers);
    });
  }, []);

  return (
    <div className="container">
      <h3 className="text-center mb-4">Welcome To {location.state.roomName}</h3>
      <h5>Users</h5>
      <div className="d-flex mb-4">
        {users.map((user) => (
          <div className="rounded-pill p-3 bg-light m-1" key={user.id}>
            {user.username}
          </div>
        ))}
      </div>
      <h5>Chat</h5>
      {messages.map((m) => (
        <div className="bg-light rounded-3 mb-2 p-3" key={m.text}>
          <div className="fs-6 text-info">{m.username}</div>
          {m.text}
        </div>
      ))}

      <form onSubmit={submitHandler} className="mt-4">
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
