using api.Context;
using api.Models.DTO;
using api.Repositories.Interfaces;

namespace api.Repositories
{
    public class OrderItemRepository: RepositoryBase<OrderItem>,IOrderItemRepository
    {
        public OrderItemRepository(MainContext _context)
        : base(_context)
        {
        }


    }

}
