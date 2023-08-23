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
            var result = _categoryRepo.FindByCondition(p => p.Id == id).Include(c=>c.Products).FirstOrDefault();
            if(result == null) return Ok(result);
            var products = new List<Product>();
            foreach (var product in result.Products)
            {
                products.Add(new Product
                {
                    Id = product.Id,
                    DisplayName = product.DisplayName
                });
            }

            result.Products = products;


            return Ok(result);
        }

        [HttpPost]
        public IActionResult Create(CategoryCreateRequest categoryCreateRequest)
        {
            if (categoryCreateRequest == null)
            {
                return BadRequest();
            }
            bool c = _categoryRepo.FindByCondition(p=>p.Id == categoryCreateRequest.Id).Any();

            if(c)
            {
                return BadRequest("Could Not Create New Category with existing Id");

            }
            else
            {
                Category category = new Category {
                    Id = categoryCreateRequest.Id,
                    DisplayName = categoryCreateRequest.DisplayName,
                    Icon = categoryCreateRequest.Icon,
                };
                var result = _categoryRepo.Create(category);
                return Created("category", result);
            }

        }

        [HttpPut]
        public IActionResult Update(CategoryCreateRequest categoryCreateRequest)
        {
            if (categoryCreateRequest == null)
            {
                return BadRequest();
            }
            if (categoryCreateRequest.Id == 0)
            {
                return BadRequest("Category Id cant be null or id of zero");
            }
            var c = _categoryRepo.FindByCondition(c => c.Id == categoryCreateRequest.Id).FirstOrDefault();
            if (c == null)
            {
                return NotFound();
            }

            Category category = new Category()
            { 
                Id = categoryCreateRequest.Id,
                DisplayName = categoryCreateRequest.DisplayName,
                Icon = categoryCreateRequest.Icon,
                Products = c.Products,
            };

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

public class CategoryCreateRequest
{
    public int Id { get; set; }
    public string DisplayName { get; set; }
    public string Icon { get; set; }

}