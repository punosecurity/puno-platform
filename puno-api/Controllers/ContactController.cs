using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;

namespace puno_api.Controllers;

[ApiController]
[Route("api")]
public class ContactController : ControllerBase
{
    private readonly EmailSettings _email;

    public ContactController(IOptions<EmailSettings> email)
    {
        _email = email.Value;
    }

    public class ContactDto
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Topic { get; set; }
        public string? Message { get; set; }
    }

    [HttpPost("contact")]
    public async Task<IActionResult> Contact([FromBody] ContactDto dto)
    {
        if (dto == null)
            return BadRequest(new { message = "Missing payload" });

        if (string.IsNullOrWhiteSpace(dto.Name) ||
            string.IsNullOrWhiteSpace(dto.Email) ||
            string.IsNullOrWhiteSpace(dto.Topic) ||
            string.IsNullOrWhiteSpace(dto.Message))
        {
            return BadRequest(new { message = "All fields are required." });
        }

        if (!System.Text.RegularExpressions.Regex.IsMatch(dto.Email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
            return BadRequest(new { message = "Invalid email." });

        if (string.IsNullOrWhiteSpace(_email.Host) ||
            string.IsNullOrWhiteSpace(_email.Username) ||
            string.IsNullOrWhiteSpace(_email.Password))
        {
            return StatusCode(500, new { message = "Email provider is not configured." });
        }

        try
        {
            using var mail = new MailMessage();
            mail.From = new MailAddress(_email.FromAddress ?? _email.Username, _email.FromDisplayName ?? "PUNO");
            mail.To.Add(_email.ToAddress);
            mail.Subject = $"PUNO contact: {dto.Topic}";
            mail.Body = $"Emri: {dto.Name}\nEmail: {dto.Email}\nTema: {dto.Topic}\n\nMesazhi:\n{dto.Message}";
            mail.IsBodyHtml = false;
            mail.BodyEncoding = System.Text.Encoding.UTF8;
            mail.SubjectEncoding = System.Text.Encoding.UTF8;

            using var smtp = new SmtpClient(_email.Host, _email.Port);
            smtp.EnableSsl = _email.EnableSsl;
            smtp.Credentials = new NetworkCredential(_email.Username, _email.Password);

            await smtp.SendMailAsync(mail);

            return Ok(new { message = "Message sent." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Failed to send email.", error = ex.Message });
        }
    }
}

public class EmailSettings
{
    public string? Host { get; set; }
    public int Port { get; set; } = 587;
    public bool EnableSsl { get; set; } = true;

    public string? Username { get; set; }
    public string? Password { get; set; }

    public string ToAddress { get; set; } = "punosecurity@gmail.com";

    public string? FromAddress { get; set; }
    public string? FromDisplayName { get; set; }
}

