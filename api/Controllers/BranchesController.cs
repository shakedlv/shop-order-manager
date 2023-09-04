using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Context;
using api.Models.DTO;
using api.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BranchesController : ControllerBase { 
    private readonly IConfiguration _config;
    private readonly IBranchRepository _branchRepo;

    public BranchesController(IConfiguration _config, IBranchRepository _branchRepo)
    {
        this._config = _config ?? throw new ArgumentNullException(nameof(_config));
        this._branchRepo = _branchRepo ?? throw new ArgumentNullException(nameof(_branchRepo));
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var result = _branchRepo.GetBranchWithOrders();
        return Ok(result);
    }

    [HttpGet("{id:int}")]
    public IActionResult GetByID(int id)
    {
        var result = _branchRepo.FindByCondition(p => p.Id == id).Include(b=>b.Orders).FirstOrDefault();
            if (result == null) return NotFound();

            var items = new List<Order>();
            foreach (var item in result.Orders)
            {
                items.Add(new Order()
                {
                    Id = item.Id,
                    UserId = item.UserId,
                    PickUpDate = item.PickUpDate,
                    Status = item.Status,

                });
            }
            result.Orders = items;

            return Ok(result);
    }

    [HttpPost, Authorize]
    public IActionResult Create(Branch branch)
    {
        if (branch == null)
        {
            return BadRequest();
        }

        var result = _branchRepo.Create(branch);

        return Created("branch", result);
    }

    [HttpPut, Authorize]
    public IActionResult Update(Branch branch)
    {
        if (branch == null)
        {
            return BadRequest();
        }

        var exists = _branchRepo.FindByCondition(c => c.Id == branch.Id).AsNoTracking().Any();
        if (!exists)
        {
            return NotFound();
        }

        _branchRepo.Update(branch);

        return NoContent();
    }

    [HttpDelete("{id:int}"), Authorize]
    public IActionResult Delete(int id)
    {
        var category = _branchRepo.FindByCondition(c => c.Id == id).FirstOrDefault();
        if (category == null)
        {
            return NotFound();
        }

        _branchRepo.Delete(category);
        return NoContent();
    }

}
}
