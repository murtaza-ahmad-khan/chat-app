import React from "react";

export default function MessengerInput() {
  return (
    <div className="messenger__input">
      <form className="d-flex">
        <input className="form-control" placeholder="Message" />
        <button className="btn btn-info text-white">Send</button>
      </form>
    </div>
  );
}
