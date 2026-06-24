using BCrypt.Net;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using puno_api.Data;
using puno_api.Models;

namespace puno_api.Controllers;

[ApiController]
[Route("api")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    public AuthController(AppDbContext context) => _context = context;

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        if (await _context.Users.AnyAsync(u => u.Username == dto.Username))
            return BadRequest(new { message = "Username already exists." });

        // First registered user automatically becomes Admin for testing
        bool isFirstUser = !await _context.Users.AnyAsync();

        var user = new User
        {
            Username = dto.Username,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = isFirstUser ? "Admin" : "User"
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return Ok(new { message = "User registered successfully.", role = user.Role });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == dto.Username);
        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return Unauthorized(new { message = "Invalid credentials." });

        if (user.IsDisabled)
            return StatusCode(StatusCodes.Status403Forbidden, new { message = $"Account disabled. Reason: {user.DisabledReason}" });

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role)
        };

        var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        await HttpContext.SignInAsync(new ClaimsPrincipal(identity));

        return Ok(new { username = user.Username, role = user.Role });
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Ok(new { message = "Logged out successfully." });
    }

    [Authorize]
    [HttpGet("me")]
    public IActionResult GetMe()
    {
        return Ok(new { 
            username = User.Identity?.Name, 
            role = User.FindFirst(ClaimTypes.Role)?.Value 
        });
    }
}

public record RegisterDto(string Username, string Password);
public record LoginDto(string Username, string Password);