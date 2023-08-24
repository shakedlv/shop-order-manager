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

        public IBranchRepository GetBranchesRepository()
        {
            return new BranchRepository(_context);
        }
        public IUserRepository GetUsersRepository()
        {
            return new UserRepository(_context);
        }
        public Order CreateNewOrder(Order order)
        {
            _context.Set<Order>().Add(order);
            _context.Attach(order.Branch);
            _context.Attach(order.User);

            // _context.Attach(order.OrderItems);
            Save();
            return order;
        }
        public List<Order> GetOrdersWithItems()
        {
            var orders = base.FindAll().Include(o => o.OrderItems).Include(o => o.Branch ).Include(o=>o.User).ToList();
            
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
