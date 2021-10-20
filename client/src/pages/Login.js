import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container">
      <h2 className="mt-4 mb-4">Login</h2>
      <form onSubmit={submitHandler}>
        <input className="form-control mb-3" placeholder="Username" />
        <input className="form-control mb-3" placeholder="Password" />
        <div className="d-grid">
          <button className="btn btn-primary" type="button">
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
