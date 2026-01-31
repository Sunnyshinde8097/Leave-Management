import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

function EmployeeLeaves() {
  const { token } = useContext(AuthContext);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:7118/api/leave/employee/EMP001", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setLeaves(res.data));
  }, [token]);

  return (
    <div>
      <ul>
        {leaves.map(l => (
          <li key={l.id}>{l.startDate} - {l.endDate} ({l.status})</li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeLeaves;
