using api.Context;
using api.Models.DTO;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace api.Repositories
{
    public class CategoryRepository : RepositoryBase<Category>, ICategoryRepository
    {
        public CategoryRepository(MainContext _context)
        : base(_context)
        {
        }
        public List<Category> GetCategoriesWithProducts()
        {
            var categories = base.FindAll().Include(c => c.Products).ToList();

            foreach (var category in categories)
            {
                category.Products = category.Products.Select(p => new Product
                {
                    Id = p.Id,
                    DisplayName = p.DisplayName
                }).ToList();
            }

            return categories;
        }
    }
}

