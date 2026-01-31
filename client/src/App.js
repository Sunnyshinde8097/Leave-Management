import React, { useContext, useState } from "react";
import { AuthProvider, AuthContext } from "./AuthContext";
import Login from "./Login";
import Register from "./Register";
import ApplyLeave from "./ApplyLeave";
import EmployeeLeaves from "./EmployeeLeave";
import AdminDashboard from "./AdminDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";

function AppContent() {
  const { token, role, logout } = useContext(AuthContext);
  const [showRegister, setShowRegister] = useState(false);

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
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-light border-end p-3" style={{ width: "250px", minHeight: "100vh" }}>
        <h4 className="fw-bold text-primary mb-4">Menu</h4>
        <ul className="nav flex-column">
          {role === "Employee" && (
            <>
              <li className="nav-item mb-2">
                <button className="btn btn-outline-primary w-100">Profile</button>
              </li>
              <li className="nav-item mb-2">
                <button className="btn btn-outline-primary w-100">Apply Leave</button>
              </li>
              <li className="nav-item mb-2">
                <button className="btn btn-outline-primary w-100">View Leave Remaining</button>
              </li>
              <li className="nav-item mt-3">
                <button className="btn btn-danger w-100" onClick={logout}>Logout</button>
              </li>
            </>
          )}

          {role === "Admin" && (
            <>
              <li className="nav-item mb-2">
                <button className="btn btn-outline-primary w-100">Dashboard</button>
              </li>
              <li className="nav-item mb-2">
                <button className="btn btn-outline-primary w-100">Manage Leaves</button>
              </li>
              <li className="nav-item mt-3">
                <button className="btn btn-danger w-100" onClick={logout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <h2 className="fw-bold text-primary animate__animated animate__fadeInDown mb-4">
          Leave Management System
        </h2>

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

        {role === "Admin" && (
          <div className="animate__animated animate__fadeInUp">
            <AdminDashboard />
          </div>
        )}
      </div>
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
  