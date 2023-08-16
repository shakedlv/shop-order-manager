using api.Context;
using api.Models.DTO;
using api.Repositories.Interfaces;

namespace api.Repositories
{
    public class OrderRepository : RepositoryBase<Order>, IOrderRepository
    {
        public OrderRepository(MainContext _context)
        : base(_context)
        {
        }
    }
}
