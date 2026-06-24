using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using puno_api.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. Add Controllers
builder.Services.AddControllers();

// 2. Add Database Context (SQLite)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=app.db"));

// 3. Configure Secure Cookie Authentication
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.Name = "PunoAuthCookie";
        options.Cookie.HttpOnly = true;     // Prevents JavaScript theft (XSS)
        options.Cookie.SameSite = SameSiteMode.Lax; // Allows cross-origin requests from frontend
        options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest; // works for http://localhost
        
        // Prevent redirects to non-existent HTML pages; return JSON status codes instead
        options.Events.OnRedirectToLogin = context =>
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        };
        options.Events.OnRedirectToAccessDenied = context =>
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            return Task.CompletedTask;
        };
    });

builder.Services.AddAuthorization();

// 4. Configure CORS so your frontend can communicate with the API
builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://127.0.0.1:3000", "http://localhost:3000") // Add your frontend server URL here
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials())); // Crucial for sending cookies back and forth

var app = builder.Build();

app.UseRouting();

// Enable CORS and Authentication
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();