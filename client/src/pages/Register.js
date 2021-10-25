import React, { useState } from "react";
import { Link } from "react-router-dom";

import { createUser } from "../api/users";

export default function Register({ history }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createUser({ name, username, password });
      // Save user to local storage
      const user = { id: data.id, username: data.username, name: data.name };
      localStorage.setItem("user", JSON.stringify(user));
      history.replace("/contacts");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="containerC-sm">
      <h2 className="mt-4 mb-4">Sign up</h2>
      <form onSubmit={submitHandler}>
        <input
          className="form-control mb-3"
          placeholder="Full Name"
          onChange={({ target: { value } }) => setName(value)}
        />
        <input
          className="form-control mb-3"
          placeholder="Username"
          onChange={({ target: { value } }) => setUsername(value)}
        />
        <input
          className="form-control mb-3"
          placeholder="Password"
          type="password"
          onChange={({ target: { value } }) => setPassword(value)}
        />
        <div className="d-grid">
          <button className="btn btn-primary" type="submit">
            Sign Up
          </button>
        </div>
      </form>
      <div className="mt-4 text-center">
        <span>Already have an account? </span>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
