import React, { useState } from "react";
import { Link } from "react-router-dom";

import { login } from "../api/auth";

export default function Login({ history }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({ username, password });
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
      <h2 className="mt-4 mb-4">Login</h2>
      <form onSubmit={submitHandler}>
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
            Login
          </button>
        </div>
      </form>
      <div className="mt-4 text-center">
        <span>Don't have an account? </span>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
