﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Context;
using api.Models.DTO;
using api.Repositories.Interfaces;
using System.Runtime.Intrinsics.Arm;
using System.Security.Cryptography;
using System.Text;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IUserRepository _userRepo;

        public UsersController(IConfiguration _config, IUserRepository _userRepo)
        {
            this._config = _config ?? throw new ArgumentNullException(nameof(_config));
            this._userRepo = _userRepo ?? throw new ArgumentNullException(nameof(_userRepo));
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var result = _userRepo.FindAll().ToList();
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public IActionResult GetByID(int id)
        {
            var result = _userRepo.FindByCondition(u => u.Id == id).FirstOrDefault();
            return Ok(result);
        }

        [HttpPost]
        public IActionResult Create(User user)
        {
            if (user == null)
            {
                return BadRequest();
            }

            user.Password = HashPassword(user.Password);
            var result = _userRepo.Create(user);

            return Created("user", result);
        }
        private string HashPassword(string password)
        {
            var sha = SHA256.Create();
            var asByteArray = Encoding.Default.GetBytes(password);
            var hashed = sha .ComputeHash(asByteArray);
            return Convert.ToBase64String(hashed);
        }
        
        [HttpPut]
        public IActionResult Update(User user)
        {
            if (user == null)
            {
                return BadRequest();
            }

            var exists = _userRepo.FindByCondition(u => u.Id == user.Id).Any();
            if (!exists)
            {
                return NotFound();
            }

            _userRepo.Update(user);

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var user = _userRepo.FindByCondition(u => u.Id == id).FirstOrDefault();
            if (user == null)
            {
                return NotFound();
            }

            _userRepo.Delete(user);
            return NoContent();
        }
    }
}