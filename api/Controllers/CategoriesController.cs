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
    public class CategoriesController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ICategoryRepository _categoryRepo;

        public CategoriesController(IConfiguration _config, ICategoryRepository _categoryRepo)
        {
            this._config = _config ?? throw new ArgumentNullException(nameof(_config));
            this._categoryRepo = _categoryRepo ?? throw new ArgumentNullException(nameof(_categoryRepo));
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var result = _categoryRepo.GetCategoriesWithProducts();
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetByID(int id)
        {
            var result = _categoryRepo.FindByCondition(p => p.Id == id).FirstOrDefault();
            return Ok(result);
        }

        [HttpPost]
        public IActionResult Create(Category category)
        {
            if (category == null)
            {
                return BadRequest();
            }
            bool c = _categoryRepo.FindByCondition(p=>p.DisplayName == category.DisplayName).Any();

            if(!c)
            {
                var result = _categoryRepo.Create(category);
                return Created("category", result);
            }
            else
            {
                return NoContent();
            }

        }

        [HttpPut]
        public IActionResult Update(Category category)
        {
            if (category == null)
            {
                return BadRequest();
            }

            var exists = _categoryRepo.FindByCondition(c => c.Id == category.Id).AsNoTracking().Any();
            if (!exists)
            {
                return NotFound();
            }

            _categoryRepo.Update(category);

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var category = _categoryRepo.FindByCondition(c => c.Id == id).FirstOrDefault();
            if (category == null)
            {
                return NotFound();
            }

            _categoryRepo.Delete(category);
            return NoContent();
        }

    }
}
