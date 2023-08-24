using api.Context;
using api.Models.DTO;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class BranchRepository : RepositoryBase<Branch>, IBranchRepository
    {
        public BranchRepository(MainContext _context)
        : base(_context)
        {
        }

        public List<Branch> GetBranchWithOrders()
        {
            var branches = base.FindAll().Include(p => p.Orders).ToList();

            foreach (var branch in branches)
            {
                var orders = new List<Order>();
                foreach (var order in branch.Orders)
                {
                    orders.Add( new Order
                    {
                        Id = order.Id,
                        CreatedDate = order.CreatedDate,
                        IsPaid = order.IsPaid,
                        PickUpDate = order.PickUpDate,
                        Status = order.Status,
                        UserId = order.UserId,

                    });
                }
                branch.Orders = orders;

            }

            return branches;
        }
    }
}
