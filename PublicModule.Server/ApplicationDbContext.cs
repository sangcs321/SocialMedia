using Microsoft.EntityFrameworkCore;
using PublicModule.Server.Models.Me;
using PublicModule.Server.Models.User;

namespace PublicModule.Server
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Me> Me { get; set; }
        public DbSet<User> User { get; set; }
    }
}