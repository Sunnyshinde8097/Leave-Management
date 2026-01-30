import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

function ApplyLeave() {
  const { token } = useContext(AuthContext);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const applyLeave = async () => {
    await axios.post("http://localhost:5000/api/leave/apply", {
      employeeId: "EMP001", startDate, endDate, reason
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert("Leave applied successfully");
  };

  return (
    <div>
      <h2>Apply Leave</h2>
      <input type="date" onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" onChange={(e) => setEndDate(e.target.value)} />
      <input type="text" placeholder="Reason" onChange={(e) => setReason(e.target.value)} />
      <button onClick={applyLeave}>Submit</button>
    </div>
  );
}

export default ApplyLeave;
