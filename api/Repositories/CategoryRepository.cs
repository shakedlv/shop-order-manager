using api.Context;
using api.Models.DTO;
using api.Repositories.Interfaces;

namespace api.Repositories
{
    public class CategoryRepository : RepositoryBase<Category>, ICategoryRepository
    {
        public CategoryRepository(MainContext _context)
        : base(_context)
        {
        }
    }
}
