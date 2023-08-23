using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace api.Models.DTO
{
    public class Category
    {
        [Key]public int Id { get; set; }
        public string DisplayName { get; set; }
        public string Icon { get; set; }
        public  List<Product> Products { get; set; } = new();

    }
}
