import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
};

export default App;
