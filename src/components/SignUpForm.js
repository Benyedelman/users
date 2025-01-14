import React, { useState } from "react";
import { createUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/SignUpForm.css";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(formData)
      .then(() => {
        setSuccess("User registered successfully!");
        setError("");
        setTimeout(() => {
          navigate("/dashboard"); // מעבר לדף המשתמשים
        }, 1500);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to register user.");
        console.error(err.response?.data);
      });
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default SignUpForm;
