import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="bg-light p-4 d-inline m-2">
        <Link to="/room/join" className="text-decoration-none fs-4">
          Join Room
        </Link>
      </div>

      <div className="bg-light p-4 d-inline m-2">
        <Link to="/login" className="text-decoration-none fs-4">
          Join Chat
        </Link>
      </div>
    </div>
  );
}
