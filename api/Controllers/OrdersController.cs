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
using api.Models.Enums;
using System.ComponentModel.DataAnnotations.Schema;

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
            var result = _orderRepo.GetOrdersWithItems();
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetByID(int id)
        {
            var result = _orderRepo.FindByCondition(p => p.Id == id).Include(o=>o.OrderItems).FirstOrDefault();
            var items = new List<OrderItem>();
            foreach (var item in result.OrderItems)
            {
                items.Add(new OrderItem()
                {
                    Id = item.Id,
                    ProductId = item.ProductId,
                    Amount = item.Amount,
                    Price = item.Price,

                });
            }
            result.OrderItems = items;
            return Ok(result);
        }

        [HttpPost]
        public IActionResult Create(OrderCreateRequest orderCreateRequest)
        {
            if (orderCreateRequest == null)
            {
                return BadRequest();
            }
            if (orderCreateRequest.OrderItems.Count == 0)
            {
                return BadRequest("Order Items cant be null or length of zero");
            }
            var _branchesRepo = _orderRepo.GetBranchesRepository();

            var branch = _branchesRepo.FindByCondition(x => x.Id == orderCreateRequest.BranchId).FirstOrDefault();
            var _userRepo = _orderRepo.GetUsersRepository();

            var user = _userRepo.FindByCondition(x => x.Id == orderCreateRequest.UserId).FirstOrDefault();
            var items = new List<OrderItem>();
            foreach(var item in orderCreateRequest.OrderItems)
            {
                items.Add(new OrderItem()
                {
                    Id = 0,
                    ProductId = item.ProductId,
                    Amount = item.Amount,
                    Price= item.Price,
                });
            }
            Order order = new Order()
            {
                Id = 0,
                BranchId = orderCreateRequest.BranchId,
                Branch = branch,
                CreatedDate = DateTime.UtcNow,
                IsPaid = orderCreateRequest.IsPaid,
                PickUpDate = orderCreateRequest.PickUpDate,
                Status = OrderStatus.Open,
                UserId = orderCreateRequest.UserId,
                User = user,
                UserPhone = user.PhoneCountryCode + user.PhoneNumber,
                OrderItems = items,
            };
            var result = _orderRepo.CreateNewOrder(order);

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


public class OrderCreateRequest 
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string UserPhone { get; set; }
    public int BranchId { get; set; }
    public DateTime PickUpDate { get; set; }
    public bool IsPaid { get; set; }
    public OrderStatus Status { get; set; }
    public List<OrderItemCreateRequest> OrderItems { get; set; } = new();
}

public class OrderItemCreateRequest
{
    public int ProductId { get; set; }
    public int Amount { get; set; }
    public decimal Price { get; set; }
}

