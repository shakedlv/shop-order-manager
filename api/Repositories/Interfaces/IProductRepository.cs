using api.Models.DTO;

namespace api.Repositories.Interfaces
{
    public interface IProductRepository : IRepositoryBase<Product>
    {
        public List<Product> GetProductsWithCategories();
        public ICategoryRepository GetCategoryRepository();
    
    }
}
