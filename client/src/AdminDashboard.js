import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

function AdminDashboard() {
  const { token } = useContext(AuthContext);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/leave/all", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setLeaves(res.data));
  }, [token]);

  const updateLeave = async (id, status) => {
    await axios.put(`http://localhost:5000/api/leave/update/${id}`, status, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    });
    setLeaves(leaves.map(l => l.id === id ? { ...l, status } : l));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Employee</th><th>Start</th><th>End</th><th>Reason</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map(l => (
            <tr key={l.id}>
              <td>{l.employeeId}</td>
              <td>{l.startDate}</td>
              <td>{l.endDate}</td>
              <td>{l.reason}</td>
              <td>{l.status}</td>
              <td>
                <button onClick={() => updateLeave(l.id, "Approved")}>Approve</button>
                <button onClick={() => updateLeave(l.id, "Rejected")}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
