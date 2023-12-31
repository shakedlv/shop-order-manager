﻿using api.Models.DTO;

namespace api.Repositories.Interfaces
{
    public interface IBranchRepository: IRepositoryBase<Branch>
    {
        public List<Branch> GetBranchWithOrders();

    }
}
