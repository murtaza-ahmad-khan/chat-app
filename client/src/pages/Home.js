import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div className="bg-light p-4 d-inline">
        <Link to="/room/join" className="text-decoration-none fs-5">
          Join Room
        </Link>
      </div>
    </div>
  );
}
