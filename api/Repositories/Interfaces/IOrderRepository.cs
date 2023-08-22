using api.Models.DTO;

namespace api.Repositories.Interfaces
{
    public interface IOrderRepository : IRepositoryBase<Order>
    {
        public List<Order> GetOrdersWithItems();
    }
}
