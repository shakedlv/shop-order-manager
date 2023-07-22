using System.ComponentModel.DataAnnotations;

namespace api.Models.DTO
{
    public class LoginInfo
    {
        [Required] public string Username { get; set; }
        [Required] public string Password { get; set; }
    }
}
