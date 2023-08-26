using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace api.Models.DTO
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string DisplayName { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }

        public virtual Category Category { get; set; }

        public string Image { get; set; }
        [DefaultValue(1.0f)] public decimal Price { get; set;}
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)] public DateTime CreatedDate { get; set; }
        [DefaultValue(true)] public bool DisplayOnStore { get; set; }

        public List<OrderItem> OrderItems { get; set; } = new();

    }
}
