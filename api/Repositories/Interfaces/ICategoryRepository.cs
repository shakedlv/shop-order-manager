using api.Models.DTO;

namespace api.Repositories.Interfaces
{
    public interface ICategoryRepository : IRepositoryBase<Category>
    {
        public Category CreateNewCategory(Category category);

        public List<Category> GetCategoriesWithProducts();

    }
}
