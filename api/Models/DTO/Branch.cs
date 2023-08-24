using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;


namespace api.Models.DTO
{
    public class Branch
    {
        [Key] public int Id { get; set; }
        public string DisplayName { get; set; }
        public string Address { get; set; }

        public List<Order> Orders { get; set; } = new();

    }
}
