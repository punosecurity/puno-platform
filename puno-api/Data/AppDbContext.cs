using Microsoft.EntityFrameworkCore;
using puno_api.Models;

namespace puno_api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<User> Users => Set<User>();
}