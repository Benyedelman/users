import React, { useState } from "react";
import { login } from "../services/api";
import "../styles/LoginForm.css";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials)
      .then(() => navigate("/dashboard"))
      .catch(() => setError("Invalid username or password"));
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </form>
  );
};

export default LoginForm;
