import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [userId, setUserId] = useState(localStorage.getItem("userId")); // ✅ new state

  const login = (data) => {
    setToken(data.token);
    setRole(data.role);
    setUserId(data.userId); // ✅ store userId

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("userId", data.userId);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUserId(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ token, role, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
  