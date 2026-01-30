import React, { useContext, useState } from "react";
import { AuthProvider, AuthContext } from "./AuthContext";
import Login from "./Login";
import Register from "./Register";
import ApplyLeave from "./ApplyLeave";
import EmployeeLeaves from "./EmployeeLeave";
import AdminDashboard from "./AdminDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css"; // ✅ Correct import

function AppContent() {
  const { token, role, logout } = useContext(AuthContext);
  const [showRegister, setShowRegister] = useState(false); // ✅ toggle state

  if (!token) {
    return (
      <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
        <div className="card shadow-lg p-4 animate__animated animate__fadeIn" style={{ width: "400px" }}>
          {!showRegister ? (
            <>
              <h2 className="text-primary mb-3">Welcome Back 👋</h2>
              <Login />
              <p className="mt-3 text-center">
                Don’t have an account?{" "}
                <button
                  className="btn btn-link text-decoration-none"
                  onClick={() => setShowRegister(true)}
                >
                  Register
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-success mb-3">Create Account ✨</h2>
              <Register />
              <p className="mt-3 text-center">
                Already registered?{" "}
                <button
                  className="btn btn-link text-decoration-none"
                  onClick={() => setShowRegister(false)}
                >
                  Back to Login
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      {/* Navbar/Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary animate__animated animate__fadeInDown">
          Leave Management System
        </h2>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Employee Dashboard */}
      {role === "Employee" && (
        <div className="row">
          <div className="col-md-6 animate__animated animate__fadeInLeft">
            <ApplyLeave />
          </div>
          <div className="col-md-6 animate__animated animate__fadeInRight">
            <EmployeeLeaves />
          </div>
        </div>
      )}

      {/* Admin Dashboard */}
      {role === "Admin" && (
        <div className="animate__animated animate__fadeInUp">
          <AdminDashboard />
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
