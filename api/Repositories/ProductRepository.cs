using api.Context;
using api.Models.DTO;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class ProductRepository : RepositoryBase<Product>, IProductRepository
    {
        public ProductRepository(MainContext _context)
        : base(_context)
        {
            
        }

        public ICategoryRepository GetCategoryRepository()
        {
            return new CategoryRepository(_context);
        }

        public List<Product> GetProductsWithCategories()
        {
            var products = base.FindAll().Include(p => p.Categories).ToList();

            foreach (var product in products)
            {
                product.Categories = product.Categories.Select(c => new Category
                {
                    Id = c.Id,
                    DisplayName = c.DisplayName,
                    Icon = c.Icon,
                    
                }).ToList();
            }

            return products;
        }
    }
}
