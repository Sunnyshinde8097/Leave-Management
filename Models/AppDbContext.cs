using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Leave> Leaves { get; set; }
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{ // Configure FK relationship
        //   modelBuilder.Entity<Leave>()
        //        .HasOne(l => l.)
        //        .WithMany(u => u.Leaves) .HasForeignKey(l => l.EmployeeId) .OnDelete(DeleteBehavior.Cascade); }
        //}
    }   
}
