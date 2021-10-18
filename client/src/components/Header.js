import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <ul className="nav d-flex justify-content-center p-2">
      <li className="nav-item">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
      </li>
    </ul>
  );
}
