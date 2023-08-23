using api.Models.DTO;
using Microsoft.EntityFrameworkCore;
using api.Models;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Build.Evaluation;

namespace api.Context
{
    public class MainContext : DbContext
    {
        public MainContext(DbContextOptions<MainContext> _options)
        : base(_options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Branch> Branches { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().HasMany(u=>u.Orders).WithOne(o => o.User).HasForeignKey(o => o.UserId);
            modelBuilder.Entity<User>().HasData(InitialData.Users);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.Category).WithMany(u => u.Products).HasForeignKey(p => p.CategoryId)
                .HasPrincipalKey(c => c.Id);
            modelBuilder.Entity<Category>()
                .HasMany(c => c.Products)
                .WithOne(p => p.Category)
                .HasForeignKey(p => p.CategoryId).IsRequired().OnDelete(DeleteBehavior.NoAction); ;

            modelBuilder.Entity<Category>().HasData(InitialData.Categories);
            modelBuilder.Entity<Product>().HasData(InitialData.Products);


            modelBuilder.Entity<Branch>().HasData(InitialData.Branches);

            
            modelBuilder.Entity<Order>().HasMany(o => o.OrderItems).WithOne(i => i.Order)
                .HasForeignKey(o => o.OrderId).IsRequired();

            modelBuilder.Entity<Branch>().HasMany(b => b.Orders).WithOne(o => o.Branch)
                .HasForeignKey(o => o.BranchId).IsRequired();
        }



    }
}
