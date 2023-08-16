using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace api.Models.DTO
{
    public class User
    {
         [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public string PhoneCountryCode { get; set; }
        public string PhoneNumber { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public DateTime BirthdayDate { get; set; }
        [DefaultValue(false)] public bool IsAdmin { get; set; }
        public DateTime CreatedDate { get; set; }


    }
}
