using api.Models.DTO;
using Microsoft.EntityFrameworkCore;
using api.Models;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace api.Context
{
    public class MainContext : DbContext
    {
        public MainContext(DbContextOptions<MainContext> _options)
        : base(_options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Category> Category { get; set; }

        public DbSet<Branch> Branches { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);




            modelBuilder.Entity<User>().HasData(InitialData.Users);
            
            modelBuilder.Entity<Category>().HasData(InitialData.Categories);

            modelBuilder.Entity<Product>().HasOne(p => p.Category).WithMany(c => c.Products).OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Product>().HasData(InitialData.Products);

            modelBuilder.Entity<Branch>().HasData(InitialData.Branches);

        }

    }
}
