using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace api.Models.DTO
{
    public class Category
    {
        [Key , DatabaseGenerated(DatabaseGeneratedOption.Identity)]public int Id { get; set; }
        public string DisplayName { get; set; }
        [AllowNull]public List<Product>? Products { get; set; }
    }
}
