using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using puno_api.Data;

namespace puno_api.Controllers;

[ApiController]
[Route("api/admin")]
[Authorize(Roles = "Admin")] // Enforces that ONLY admins can touch these endpoints
public class AdminController : ControllerBase
{
    private readonly AppDbContext _context;
    public AdminController(AppDbContext context) => _context = context;

    [HttpPost("disable")]
    public async Task<IActionResult> DisableUser([FromBody] DisableDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == dto.Username);
        if (user == null) return NotFound(new { message = "User not found." });

        user.IsDisabled = true;
        user.DisabledReason = dto.Reason;
        user.DisabledAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return Ok(new { message = $"User {dto.Username} has been disabled." });
    }

    [HttpPost("enable")]
    public async Task<IActionResult> EnableUser([FromBody] EnableDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == dto.Username);
        if (user == null) return NotFound(new { message = "User not found." });

        user.IsDisabled = false;
        user.DisabledReason = null;
        user.DisabledAt = null;

        await _context.SaveChangesAsync();
        return Ok(new { message = $"User {dto.Username} has been re-enabled." });
    }
}

public record DisableDto(string Username, string Reason);
public record EnableDto(string Username);