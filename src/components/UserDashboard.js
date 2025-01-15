
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser, updateUser } from "../services/api";
import { setUsers } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import "../styles/UserDashboard.css";

const UserDashboard = () => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [updatedData, setUpdatedData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });


  useEffect(() => {
    const fetchAndSetUsers = async () => {
      try {
        const response = await fetchUsers();
        dispatch(setUsers(response.data)); 
        setUserCount(response.data.length); 
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchAndSetUsers();
  }, [dispatch, users]);

  const handleAddUser = () => {
    navigate("/signup"); 
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/", { replace: true });
  };
  

  const handleCancel = () => {
    setEditingUser(null);
    setDeletingUser(null);
    setIsAddingUser(false);
  };
  
  const handleDelete = (id) => {
    deleteUser(id).then(() => {
      dispatch(setUsers(users.filter((user) => user._id !== id)));
      setDeletingUser(null);
    });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setUpdatedData({
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      password: "",
    });
  };

  const handleSave = () => {
    if (!editingUser) return;

    const dataToUpdate = { ...updatedData };
    if (!dataToUpdate.password) {
      delete dataToUpdate.password;
    }

    updateUser(editingUser._id, dataToUpdate)
      .then(() => {
        dispatch(
          setUsers(
            users.map((user) =>
              user._id === editingUser._id ? { ...user, ...updatedData } : user
            )
          )
        );
        setEditingUser(null);
      })
      .catch((error) => {
        console.error("Failed to update user:", error.response?.data || error.message);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>User Dashboard</h1>
        <div className="header-buttons">
        <span className="user-count">Number of users: {userCount}</span>
            <button className="small-button adduser-button" onClick={handleAddUser}>
            Add User
            </button>
            <button className="small-button logout-button" onClick={handleLogout}>
              Logout
            </button>
        </div>
      </div>

      {isAddingUser ? (
        <SignUpForm onCancel={handleCancel} />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>
                  <div className="table-buttons-container">
                    <button className="edit-button" onClick={() => handleEdit(user)}>
                      Edit
                    </button>
                    <button className="delete-button" onClick={() => setDeletingUser(user)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editingUser && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit User</h2>
            <input
              type="text"
              name="username"
              value={updatedData.username}
              onChange={handleChange}
              placeholder="Username"
            />
            <input
              type="text"
              name="fullName"
              value={updatedData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
            />
            <input
              type="email"
              name="email"
              value={updatedData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <p className="password-note">
              If you don't want to update the password, leave this field blank.
            </p>
            <input
              type="password"
              name="password"
              value={updatedData.password}
              onChange={handleChange}
              placeholder="New Password"
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}

      {deletingUser && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Are you sure?</h2>
            <p>
              Are you sure you want to delete <strong>{deletingUser.username}</strong>?
            </p>
            <button onClick={() => handleDelete(deletingUser._id)}>Yes, Delete</button>
            <button onClick={() => setDeletingUser(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
