using api.Models.DTO;
using api.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IUserRepository _userRepo;
        public LoginController(IConfiguration _config, IUserRepository _userRepo)
        {
            this._config = _config ?? throw new ArgumentNullException(nameof(_config));
            this._userRepo = _userRepo ?? throw new ArgumentNullException(nameof(_userRepo));
        }

        [HttpPost]
        public IActionResult GetToken(LoginInfo loginInfo)
        {
            if (loginInfo == null)
            {
                return BadRequest();
            }

            User user = _userRepo.FindByCondition(u => u.Username == loginInfo.Username && u.Password.Equals(HashPassword(loginInfo.Password))).FirstOrDefault();

            if (user == null)
            {
                return Unauthorized();
            }


            var key = new SymmetricSecurityKey(
                Encoding.ASCII.GetBytes(_config["Authentication:Secret"] ?? throw new ArgumentException("Authentication:Secret"))
            );

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>() {
                new Claim("sub", user.Id.ToString())
            };

            string validAudience = _config["Authentication:Audience"] ?? throw new ArgumentException("Authentication:Audience");
            string validIssuer = _config["Authentication:Issuer"] ?? throw new ArgumentException("Authentication:Issuer");

            var token = new JwtSecurityToken(
                validIssuer,
                validAudience,
                claims,
                DateTime.UtcNow,
                DateTime.UtcNow.AddDays(1),
                creds
            );

            var tokenStr = new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(new UserResponse(tokenStr, user.IsAdmin));
        }

        private string HashPassword(string password)
        {
            var sha = SHA256.Create();
            var asByteArray = Encoding.Default.GetBytes(password);
            var hashed = sha.ComputeHash(asByteArray);
            return Convert.ToBase64String(hashed);
        }
    }
    
}

class UserResponse
{
    public string token { get; set;}
    public bool isAdmin { get; set;}
    public UserResponse(string _token , bool _admin)
    {
        token = _token;
        isAdmin = _admin;
    }
}
