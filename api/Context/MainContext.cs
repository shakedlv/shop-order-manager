using api.Models.DTO;
using Microsoft.EntityFrameworkCore;

namespace api.Context
{
    public class MainContext : DbContext
    {
        public MainContext(DbContextOptions<MainContext> _options)
        : base(_options)
        {
        }
        public DbSet<User> Users { get; set; }

    }
}
