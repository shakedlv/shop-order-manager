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
        var result = _branchRepo.FindAll().ToList();
        return Ok(result);
    }

    [HttpGet("{id:int}")]
    public IActionResult GetByID(int id)
    {
        var result = _branchRepo.FindByCondition(p => p.Id == id).FirstOrDefault();
        return Ok(result);
    }

    [HttpPost]
    public IActionResult Create(Branch branch)
    {
        if (branch == null)
        {
            return BadRequest();
        }

        var result = _branchRepo.Create(branch);

        return Created("branch", result);
    }

    [HttpPut]
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

    [HttpDelete("{id:int}")]
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
