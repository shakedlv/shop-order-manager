using api.Models.DTO;
using Microsoft.EntityFrameworkCore;

namespace api.Context
{
    public class ApiDbContext: DbContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }

        public ApiDbContext(DbContextOptions options) : base(options)
        {

        }
        User test = new User()
        {
            Id = 1,
            Username = "test",
            Password = "test123",
            Email = "test@test.com",
            Firstname = "test",
            Lastname = "test",
            IsAdmin = false,
        };
        User admin = new User()
        {
            Id = 2,
            Username = "admin",
            Password = "admin123",
            Email = "admin@admin.com",
            Firstname = "admin",
            Lastname = "admin",
            IsAdmin = true,
        };
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

        }
    }
}
