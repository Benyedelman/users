import React, { useState } from "react";
import { createUser, updateUser } from "../services/api";
import "../styles/UserForm.css";

const UserForm = ({ existingUser = {}, onSave }) => {
  const [formData, setFormData] = useState({
    username: existingUser.username || "",
    fullName: existingUser.fullName || "",
    email: existingUser.email || "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const saveFunction = existingUser._id ? updateUser : createUser;
    saveFunction(existingUser._id, formData).then(() => onSave());
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
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
        onChange={handleChange}
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default UserForm;
