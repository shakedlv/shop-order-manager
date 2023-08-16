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
    public class OrdersController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IOrderRepository _orderRepo;

        public OrdersController(IConfiguration _config, IOrderRepository _orderRepo)
        {
            this._config = _config ?? throw new ArgumentNullException(nameof(_config));
            this._orderRepo = _orderRepo ?? throw new ArgumentNullException(nameof(_orderRepo));
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var result = _orderRepo.FindAll().ToList();
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetByID(int id)
        {
            var result = _orderRepo.FindByCondition(p => p.Id == id).FirstOrDefault();
            return Ok(result);
        }

        [HttpPost]
        public IActionResult Create(Order order)
        {
            if (order == null)
            {
                return BadRequest();
            }

            var result = _orderRepo.Create(order);

            return Created("order", result);
        }

        [HttpPut]
        public IActionResult Update(Order order)
        {
            if (order == null)
            {
                return BadRequest();
            }

            var exists = _orderRepo.FindByCondition(c => c.Id == order.Id).AsNoTracking().Any();
            if (!exists)
            {
                return NotFound();
            }

            _orderRepo.Update(order);

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var Order = _orderRepo.FindByCondition(c => c.Id == id).FirstOrDefault();
            if (Order == null)
            {
                return NotFound();
            }

            _orderRepo.Delete(Order);
            return NoContent();
        }
    }
}
