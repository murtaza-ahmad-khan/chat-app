import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { login } from "../api/auth";
import { AuthContext } from "../context/AuthProvider";

export default function Login({ history }) {
  const authContext = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("password");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { user, token } = await login({ username, password });
      // Set Auth State
      authContext.setState({ user, token });
      // Redirect User to Chat
      history.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="containerC-sm">
      <h2 className="mt-4 mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-3"
          placeholder="Username"
          value={username}
          onChange={({ target: { value } }) => setUsername(value)}
        />
        <input
          className="form-control mb-3"
          placeholder="Password"
          type="password"
          value={password}
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
