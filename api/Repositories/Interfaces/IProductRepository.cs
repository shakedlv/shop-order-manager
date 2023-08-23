using api.Models.DTO;

namespace api.Repositories.Interfaces
{
    public interface IProductRepository : IRepositoryBase<Product>
    {
        public Product CreateNewProduct(Product product);
        public List<Product> GetProductsWithCategories();
        public ICategoryRepository GetCategoryRepository();
    
    }
}
