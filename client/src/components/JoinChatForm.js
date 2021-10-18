import React from "react";

export default function JoinChatForm() {
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container">
      <h2 className="mt-4 mb-4">Chat</h2>
      <form onSubmit={submitHandler}>
        <input className="form-control mb-3" placeholder="Your Name" />
        <input className="form-control mb-3" placeholder="User Name" />
        <div className="d-grid">
          <button className="btn btn-primary" type="button">
            Join
          </button>
        </div>
      </form>
    </div>
  );
}
