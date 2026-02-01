using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LeaveController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public LeaveController(AppDbContext context,IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    // ✅ Apply Leave
    [HttpPost("apply")]
    [Authorize]
    public async Task<IActionResult> ApplyLeave([FromBody] Leave leaveDto)
    {
        var connectionString = _configuration.GetConnectionString("DefaultConnection");

        using (var connection = new SqlConnection(connectionString))
        {
            await connection.OpenAsync();

            // Check if user exists
            var checkCmd = new SqlCommand("SELECT COUNT(*) FROM Users WHERE Id = @EmployeeId", connection);
            checkCmd.Parameters.AddWithValue("@EmployeeId", leaveDto.EmployeeId);
            var exists = (int)await checkCmd.ExecuteScalarAsync();
            if (exists == 0) return BadRequest("Invalid EmployeeId.");

            // Insert leave record
            var insertCmd = new SqlCommand(@"
            INSERT INTO Leaves (EmployeeId, StartDate, EndDate, Reason, Type, Status, AppliedOn)
            OUTPUT INSERTED.Id
            VALUES (@EmployeeId, @StartDate, @EndDate, @Reason, @Type, @Status, @AppliedOn)", connection);

            insertCmd.Parameters.AddWithValue("@EmployeeId", leaveDto.EmployeeId);
            insertCmd.Parameters.AddWithValue("@StartDate", leaveDto.StartDate);
            insertCmd.Parameters.AddWithValue("@EndDate", leaveDto.EndDate);
            insertCmd.Parameters.AddWithValue("@Reason", leaveDto.Reason);
            insertCmd.Parameters.AddWithValue("@Type", leaveDto.Type);
            insertCmd.Parameters.AddWithValue("@Status", "Pending");
            insertCmd.Parameters.AddWithValue("@AppliedOn", DateTime.UtcNow);

            var leaveId = (int)await insertCmd.ExecuteScalarAsync();

            return Ok(new { message = "Leave applied successfully!", leaveId });
        }
    }



    // ✅ View Leaves by Employee
    [HttpGet("employee/{employeeId}")]
    [Authorize]
    public async Task<IActionResult> GetEmployeeLeaves(int employeeId)
    {
        try
        {
            var leaves = await _context.Leaves
                .Where(l => l.EmployeeId == employeeId)
                .ToListAsync();

            return Ok(leaves); // returns a list of Leave objects
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred while fetching employee leaves.", details = ex.Message });
        }
    }

}

