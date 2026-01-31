import React, { useContext, useState } from "react";  
import { AuthContext } from "./AuthContext";
import api from "./api";

function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });

      const { token, role, userId } = res.data;
      login({ token, role, userId });
      alert("Data controller: " + JSON.stringify(res.data)); // ✅ Show individual values
       alert(`Token: ${token}, Role: ${role}, UserId: ${userId}`);
      alert("Login successful!");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h2 className="text-center text-primary mb-4">🔑 Login</h2>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Username"
            value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" placeholder="Password"
            value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="btn btn-primary w-100 fw-bold" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
