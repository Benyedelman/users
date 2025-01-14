import axios from "axios";

const API_URL = "https://server-n42x.onrender.com/api";

// פונקציית עזר להוספת Token לכותרות
const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.warn("No access token found in localStorage");
  }
  return {
    Authorization: ` ${token}`,
  };
};

// פונקציות API

// התחברות ושמירת Token
export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  if (response.data.token) {
    localStorage.setItem("accessToken", response.data.token);
  }
  return response;
};

// קבלת רשימת משתמשים
export const fetchUsers = async () => {
  return axios.get(`${API_URL}/users`, {
    headers: getAuthHeaders(),
  });
};

// קבלת משתמש לפי ID
export const fetchUserById = async (id) => {
  return axios.get(`${API_URL}/users/${id}`, {
    headers: getAuthHeaders(),
  });
};

// יצירת משתמש חדש
export const createUser = async (userData) => {
  return axios.post(`${API_URL}/users`, userData, {
    headers: getAuthHeaders(),
  });
};

// עדכון פרטי משתמש
export const updateUser = async (id, userData) => {
  console.log("Token:", localStorage.getItem("accessToken"));
  console.log("User Data:", userData);
  console.log("User ID:", id);

  return axios.put(`${API_URL}/users/${id}`, userData, {
    headers: getAuthHeaders(),
  });
};

// מחיקת משתמש
export const deleteUser = async (id) => {
  return axios.delete(`${API_URL}/users/${id}`, {
    headers: getAuthHeaders(),
  });
};
