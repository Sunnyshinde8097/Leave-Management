import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import api from "./api";

function ApplyLeave() {
  const { token, userId } = useContext(AuthContext);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [leaveType, setLeaveType] = useState("LeaveType");

  const applyLeave = async () => {
    // ✅ Validation
    if (!startDate || !endDate || !reason || leaveType === "LeaveType") {
      alert("All fields are mandatory!");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      alert("Start Date cannot be after End Date!");
      return;
    }

    try {
      alert("User ID  "+userId+ "and Token "+token);
      await api.post(
        "/Leave/apply",
        { employeeId: Number(userId), startDate, endDate, reason, type: leaveType },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Leave applied successfully");
      // Reset form
      setStartDate("");
      setEndDate("");
      setReason("");
      setLeaveType("LeaveType");
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
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      {/* End Date */}
      <div className="mb-2">
        <input
          type="date"
          className="form-control"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* Reason */}
      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Reason"
          value={reason}
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
          <option value="LeaveType">Leave Type</option>
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
