using api.Models.DTO;

namespace api.Repositories.Interfaces
{
    public interface IOrderRepository : IRepositoryBase<Order>
    {
        public IProductRepository GetProductsRepository();

        public IBranchRepository GetBranchesRepository();
        public Order CreateNewOrder(Order order);
        public IUserRepository GetUsersRepository();

        public List<Order> GetOrdersWithItems();
    }
}
