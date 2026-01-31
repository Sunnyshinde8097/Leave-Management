using System;

namespace API.Data
{
    public class Leave
    {
        public int Id { get; set; }                // Primary Key
        //public string EmployeeId { get; set; } = string.Empty; // User ID from AuthContext
        public DateTime StartDate { get; set; }    // Leave start date
        public DateTime EndDate { get; set; }      // Leave end date
        public string Reason { get; set; } = string.Empty; // Reason for leave
        public string Type { get; set; } = "Other"; // Sick, Planned, Other
        public string Status { get; set; } = "Pending"; // Default status
        public DateTime AppliedOn { get; set; } = DateTime.UtcNow; // Timestamp

        public int EmployeeId { get; set; } // FK to User.Id
        [System.Text.Json.Serialization.JsonIgnore]
        public User Employee { get; set; }

    }
}
