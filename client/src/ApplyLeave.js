import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import api from "./api";

function ApplyLeave() {
  const { token } = useContext(AuthContext);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [leaveType, setLeaveType] = useState("Sick"); // ✅ new state

  const applyLeave = async () => {
    try {
      await api.post(
        "/leave/apply",
        { employeeId: "EMP001", startDate, endDate, reason, type: leaveType },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Leave applied successfully");
    } catch (error) {
      console.error("Apply Leave error:", error.response?.data || error.message);
      alert("Failed to apply leave");
    }
  };

  return (
    <div className="card shadow-lg p-4">
      <h2 className="text-primary mb-3">Apply Leave</h2>

      {/* Start Date */}
      <div className="mb-2">
        <input
          type="date"
          className="form-control"
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      {/* End Date */}
      <div className="mb-2">
        <input
          type="date"
          className="form-control"
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* Reason */}
      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Reason"
          onChange={(e) => setReason(e.target.value)}
        />
      </div>

      {/* Leave Type Dropdown */}
      <div className="mb-2">
        <select
          className="form-select"
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
        >
          <option value="Sick">Sick Leave</option>
          <option value="Planned">Planned Leave</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Submit Button */}
      <button className="btn btn-primary w-100 fw-bold" onClick={applyLeave}>
        Submit
      </button>
    </div>
  );
}

export default ApplyLeave;
