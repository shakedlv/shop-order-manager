using api.Context;
using api.Models.DTO;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class OrderRepository : RepositoryBase<Order>, IOrderRepository
    {
        public OrderRepository(MainContext _context)
        : base(_context)
        {
        }


        public List<Order> GetOrdersWithItems()
        {
            var orders = base.FindAll().Include(o => o.OrderItems).ToList();

            foreach (var order in orders)
            {
                order.OrderItems = order.OrderItems.Select(i => new OrderItem
                {
                    Id = i.Id,
                    ProductId = i.ProductId,
                    Amount = i.Amount,  
                    Price = i.Price,
                }).ToList();
            }

            return orders;
        }
    }
}
