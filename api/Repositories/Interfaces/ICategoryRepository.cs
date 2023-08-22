using api.Models.DTO;

namespace api.Repositories.Interfaces
{
    public interface ICategoryRepository : IRepositoryBase<Category>
    {
        public List<Category> GetCategoriesWithProducts();

    }
}
