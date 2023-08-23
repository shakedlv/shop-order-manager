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
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IProductRepository _productRepo;
        public ProductsController(IConfiguration _config, IProductRepository _productRepo)
        {
            this._config = _config ?? throw new ArgumentNullException(nameof(_config));
            this._productRepo = _productRepo ?? throw new ArgumentNullException(nameof(_productRepo));
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
            var result = _productRepo.FindByCondition(p => p.Id == id).Include(p=>p.Category).FirstOrDefault();
            result.Category = new Category
            {
                Id = result.Category.Id,
                DisplayName = result.Category.DisplayName,
                Icon = result.Category.Icon,

            };
            return Ok(result);
        }

        [HttpPost()]
        public IActionResult Create(ProductCreateRequest productCreateRequest)
        {
            if (productCreateRequest == null)
            {
                return BadRequest();
            }
            if (productCreateRequest.CategoryId == 0)
            {
                return BadRequest("Category cant be null or id of zero");
            }

            var _categoryRepo = _productRepo.GetCategoryRepository();

            var cat = _categoryRepo.FindByCondition(x => x.Id == productCreateRequest.CategoryId).FirstOrDefault();

            if(cat == null)
            {
                return BadRequest("Invalid Category");
            }

            Product product = new Product()
            {
                Id = 0,
                CategoryId = productCreateRequest.CategoryId,
                Category = cat,
                CreatedDate = DateTime.UtcNow,
                Description = productCreateRequest.Description,
                DisplayName = productCreateRequest.DisplayName,
                DisplayOnStore = true,
                Image = productCreateRequest.Image,
                Price = productCreateRequest.Price
          
            };

            var result = _productRepo.CreateNewProduct(product);


            return Created("product", result);
        }
        
        [HttpPut]
        public IActionResult Update(ProductCreateRequest productCreateRequest)
        {
            if (productCreateRequest == null)
            {
                return BadRequest();
            }
            if (productCreateRequest.Id == 0)
            {
                return BadRequest("Product Id cant be null or id of zero");
            }
            var p = _productRepo.FindByCondition(u => u.Id == productCreateRequest.Id).FirstOrDefault();
            if (p == null)
            {
                return NotFound();
            }
            var _categoryRepo = _productRepo.GetCategoryRepository();

            var cat = _categoryRepo.FindByCondition(x => x.Id == productCreateRequest.CategoryId).FirstOrDefault();

            if (cat == null)
            {
                return BadRequest("Invalid Category");
            }
            Product product = new Product()
            {
                Id = productCreateRequest.Id,
                CategoryId = productCreateRequest.CategoryId,
                Category = cat,
                CreatedDate = p.CreatedDate,
                Description = productCreateRequest.Description,
                DisplayName = productCreateRequest.DisplayName,
                DisplayOnStore = true,
                Image = productCreateRequest.Image,
                Price = productCreateRequest.Price


            };
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

public class ProductCreateRequest
{
    public int Id { get; set; }
    public string DisplayName { get; set; }
    public string Description { get; set; }
    public int CategoryId { get; set; }
    public string Image { get; set; }
    public decimal Price { get; set; }
}
