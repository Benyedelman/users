import axios from "axios";

const API_URL = "https://server-n42x.onrender.com/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.warn("No access token found in localStorage");
    return null;
  }
  return {
    Authorization: ` ${token}`,
  };
};


export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    if (response.data.token) {
      localStorage.setItem("accessToken", response.data.token);
    }
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const headers = getAuthHeaders();
    if (!headers) throw new Error("Authentication token missing.");

    const response = await axios.get(`${API_URL}/users`, { headers });
    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchUserById = async (id) => {
  try {
    const headers = getAuthHeaders();
    if (!headers) throw new Error("Authentication token missing.");

    const response = await axios.get(`${API_URL}/users/${id}`, { headers });
    return response;
  } catch (error) {
    console.error(`Error fetching user by ID (${id}):`, error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const headers = getAuthHeaders();
    if (!headers) throw new Error("Authentication token missing.");

    const response = await axios.post(`${API_URL}/users`, userData, { headers });
    return response;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const headers = getAuthHeaders();
    if (!headers) throw new Error("Authentication token missing.");

    console.log("Token:", localStorage.getItem("accessToken"));
    console.log("User Data:", userData);
    console.log("User ID:", id);

    const response = await axios.put(`${API_URL}/users/${id}`, userData, { headers });
    return response;
  } catch (error) {
    console.error(`Error updating user (${id}):`, error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const headers = getAuthHeaders();
    if (!headers) throw new Error("Authentication token missing.");

    const response = await axios.delete(`${API_URL}/users/${id}`, { headers });
    return response;
  } catch (error) {
    console.error(`Error deleting user (${id}):`, error);
    throw error;
  }
};
