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
    public class OrderItemController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IOrderItemRepository _orderItemRepo;

        public OrderItemController(IConfiguration _config, IOrderItemRepository _orderItemRepo)
        {
            this._config = _config ?? throw new ArgumentNullException(nameof(_config));
            this._orderItemRepo = _orderItemRepo ?? throw new ArgumentNullException(nameof(_orderItemRepo));
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var result = _orderItemRepo.FindAll().ToList();
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetByID(int id)
        {
            var result = _orderItemRepo.FindByCondition(p => p.Id == id).FirstOrDefault();
            return Ok(result);
        }

        [HttpPost]
        public IActionResult Create(OrderItem orderItem)
        {
            if (orderItem == null)
            {
                return BadRequest();
            }

            var result = _orderItemRepo.Create(orderItem);

            return Created("orderItem", result);
        }

        [HttpPut]
        public IActionResult Update(OrderItem orderItem)
        {
            if (orderItem == null)
            {
                return BadRequest();
            }

            var exists = _orderItemRepo.FindByCondition(c => c.Id == orderItem.Id).AsNoTracking().Any();
            if (!exists)
            {
                return NotFound();
            }

            _orderItemRepo.Update(orderItem);

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var orderItem = _orderItemRepo.FindByCondition(c => c.Id == id).FirstOrDefault();
            if (orderItem == null)
            {
                return NotFound();
            }

            _orderItemRepo.Delete(orderItem);
            return NoContent();
        }
    }
}
