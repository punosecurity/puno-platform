namespace puno_api.Models;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Role { get; set; } = "User"; // Can be "Admin" or "User"
    
    // Status tracking for security
    public bool IsDisabled { get; set; }
    public string? DisabledReason { get; set; }
    public DateTime? DisabledAt { get; set; }
}