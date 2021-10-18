import React, { useState } from "react";

export default function RoomJoinForm({ history }) {
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    history.push({
      pathname: "/room",
      state: { username, roomName },
    });
  };
  return (
    <div className="container">
      <h2 className="mt-4 mb-4">Join Room</h2>
      <form onSubmit={submitHandler}>
        <input
          className="form-control mb-3"
          placeholder="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <input
          className="form-control mb-3"
          placeholder="Group Name"
          onChange={({ target }) => setRoomName(target.value)}
        />
        <div className="d-grid">
          <button className="btn btn-primary" type="submit">
            Join Room
          </button>
        </div>
      </form>
    </div>
  );
}
