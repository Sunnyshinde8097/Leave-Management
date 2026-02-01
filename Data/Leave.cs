using System;
using System.ComponentModel.DataAnnotations.Schema;

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
        // Default// Timestamp

        public int EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public User Employee { get; set; }
        // FK to User.Id


    }
}
