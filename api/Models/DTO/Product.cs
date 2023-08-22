using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace api.Models.DTO
{
    public class Product
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string DisplayName { get; set; }
        public string Description { get; set; }
        [ForeignKey("CategoryId")]

        public List<Category> Categories { get; set; } = new();

        public string Image { get; set; }
        [DefaultValue(1.0f)] public decimal Price { get; set;}
        public DateTime CreatedDate { get; set; }
        [DefaultValue(true)] public bool DisplayOnStore { get; set; }
    }
}
