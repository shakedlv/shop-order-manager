using api.Context;
using api.Models.DTO;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace api.Repositories
{
    public class ProductRepository : RepositoryBase<Product>, IProductRepository
    {
        public ProductRepository(MainContext _context)
        : base(_context)
        {
            
        }

        public Product CreateNewProduct(Product product)
        {
            _context.Set<Product>().Add(product);
            _context.Attach(product.Category);
            Save();
            return product;
        }
 
        public ICategoryRepository GetCategoryRepository()
        {
            return new CategoryRepository(_context);
        }

        public List<Product> GetProductsWithCategories()
        {
            var products = base.FindAll().Include(p => p.Category).ToList();

            foreach (var product in products)
            {
                product.Category = new Category
                {
                    Id = product.Category.Id,
                    DisplayName = product.Category.DisplayName,
                    Icon = product.Category.Icon,

                };
            }

            return products;
        }
    }
}
