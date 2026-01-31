import React, { useState } from "react";
import api from "./api";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Employee");

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", {  username, password, role, });
      
      alert("Registration successful!");
    } catch(error) {
      console.error("Registration error:", error.response?.data || error.message);
      alert("Registration failed!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h2 className="text-center text-success mb-4">📝 Register</h2>

        {/* Username */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Role Selection */}
        <div className="mb-3">
          <select
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Employee">Employee</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* Register Button */}
        <button
          className="btn btn-success w-100 fw-bold"
          onClick={handleRegister}
        >
          Register
        </button>

        {/* Back to Login Link */}
        <p className="mt-3 text-center">
          Already registered?{" "}
          <span className="text-primary fw-bold">Go back to Login</span>
        </p>
      </div>
    </div>
  );
}

export default Register;
