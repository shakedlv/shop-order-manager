using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace api.Models.DTO
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required] public string Username { get; set; }
        [Required] public string Password { get; set; }
        [Required] public string Email { get; set; }

        [Required] public string PhoneNumber { get; set; }
        [Required] public string Firstname { get; set; }
        [Required] public string Lastname { get; set; }
        [AllowNull] public DateTime BirthdayDate { get; set; }
        [DefaultValue(false)] public bool IsAdmin { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [AllowNull] public DateTime CreatedDate { get; set; }
        [AllowNull]  public DateTime LastLogin { get; set; }


    }
}
