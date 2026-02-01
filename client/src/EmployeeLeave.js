import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import api from "./api";

function EmployeeLeaves() {
  const { token, userId } = useContext(AuthContext);
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await api.get(`/leave/employee/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLeaves(res.data);
      } catch (err) {
        console.error("Error fetching leaves:", err.response?.data || err.message);
        setError("Failed to load leaves");
      }
    };

    if (token && userId) {
    
      fetchLeaves();
    }
  }, [token, userId]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-lg p-4 mt-3">
      <h2 className="text-primary mb-3">My Leaves</h2>
      {leaves.length === 0 ? (
        <p className="text-muted">No leaves applied yet.</p>
      ) : (
        <ul className="list-group">
          {leaves.map(l => (
            <li key={l.id} className="list-group-item">
              {new Date(l.startDate).toLocaleDateString()} - {new Date(l.endDate).toLocaleDateString()} 
              <span className="badge bg-info ms-2">{l.type}</span>
              <span
  className={`badge ms-2 ${
    l.status === "Approved"
      ? "bg-success"
      : l.status === "Rejected"
      ? "bg-danger"
      : "bg-warning"
  }`}
>
  {l.status || "Pending"}
</span>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EmployeeLeaves;
