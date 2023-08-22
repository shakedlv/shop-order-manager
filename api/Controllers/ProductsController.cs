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
    public class ProductsController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IProductRepository _productRepo;
        private readonly ICategoryRepository _categoryRepo;
        public ProductsController(IConfiguration _config, IProductRepository _productRepo, ICategoryRepository _categoryRepo)
        {
            this._config = _config ?? throw new ArgumentNullException(nameof(_config));
            this._productRepo = _productRepo ?? throw new ArgumentNullException(nameof(_productRepo));
            this._categoryRepo = _categoryRepo ?? throw new ArgumentNullException(nameof(_categoryRepo));
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var result = _productRepo.GetProductsWithCategories();
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetByID(int id)
        {
            var result = _productRepo.FindByCondition(p => p.Id == id).FirstOrDefault();
            return Ok(result);
        }

        [HttpPost()]
        public IActionResult Create(Product product)
        {
            if (product == null)
            {
                return BadRequest();
            }

            var categoryIDs = product.Categories.Select(x => x.Id).ToList();
            var _categoryRepo = _productRepo.GetCategoryRepository();
            
            product.Categories = _categoryRepo.FindByCondition(x => categoryIDs.Contains(x.Id)).ToList();

            var result = _productRepo.Create(product);


            return Created("product", result);
        }

        [HttpPut]
        public IActionResult Update(Product product)
        {
            if (product == null)
            {
                return BadRequest();
            }

            var exists = _productRepo.FindByCondition(u => u.Id == product.Id).AsNoTracking().Any();
            if (!exists)
            {
                return NotFound();
            }

            _productRepo.Update(product);

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var product = _productRepo.FindByCondition(p => p.Id == id).FirstOrDefault();
            if (product == null)
            {
                return NotFound();
            }

            _productRepo.Delete(product);
            return NoContent();
        }

    }
}
