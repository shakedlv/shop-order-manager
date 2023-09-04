using api.Context;
using api.Models.DTO;
using api.Repositories.Interfaces;

namespace api.Repositories
{
    public class UserRepository :RepositoryBase<User> ,  IUserRepository
    {
        public UserRepository(MainContext _context)
        : base(_context)
        {
        }

        public ProductRepository GetProductsRepository()
        {
            return new ProductRepository(_context);
        }
    }
}
