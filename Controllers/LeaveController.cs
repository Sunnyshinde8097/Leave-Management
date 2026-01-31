using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeaveController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LeaveController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Apply Leave
        [HttpPost("apply")]
        [Authorize]
        public async Task<IActionResult> ApplyLeave([FromBody] Leave leaveDto)
        {
            var user = await _context.Users.FindAsync(leaveDto.EmployeeId);
            if (user == null)
                return BadRequest("Invalid EmployeeId.");

            var leave = new Leave
            {
                EmployeeId = leaveDto.EmployeeId,
                StartDate = leaveDto.StartDate,
                EndDate = leaveDto.EndDate,
                Reason = leaveDto.Reason,
                Type = leaveDto.Type,
                Status = "Pending",
                AppliedOn = DateTime.UtcNow
            };

            _context.Leaves.Add(leave);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Leave applied successfully!", leaveId = leave.Id });
        }


        // ✅ View Leaves by Employee
        [HttpGet("employee/{employeeId}")]
        [Authorize]
        public async Task<IActionResult> GetEmployeeLeaves(string employeeId)
        {   
            decimal? EMPID = Convert.ToDecimal(employeeId);
            var leaves = await _context.Leaves
                .Where(l => l.EmployeeId == EMPID)
                .ToListAsync();

            return Ok(leaves);
        }
    }
}
