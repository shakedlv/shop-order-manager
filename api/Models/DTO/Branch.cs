using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;


namespace api.Models.DTO
{
    public class Branch
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)] public int Id { get; set; }
        public string DisplayName { get; set; }
        public string Address { get; set; }
        [AllowNull]public ICollection<Order>? Orders { get; set; }
    }
}
