using api.Context;
using api.Models.DTO;
using api.Repositories.Interfaces;

namespace api.Repositories
{
    public class BranchRepository : RepositoryBase<Branch>, IBranchRepository
    {
        public BranchRepository(MainContext _context)
        : base(_context)
        {
        }
    }
}
