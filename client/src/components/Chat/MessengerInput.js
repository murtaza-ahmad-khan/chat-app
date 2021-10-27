import React, { useState } from "react";

export default function MessengerInput({ onMessage }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onMessage(message);
    setMessage("");
  };

  return (
    <div className="messenger__input">
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          className="form-control"
          placeholder="Message"
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
        />
        <button className="btn btn-info text-white">Send</button>
      </form>
    </div>
  );
}
