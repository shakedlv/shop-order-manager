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

        public int? CategoryId { get; set; }
        public Category? Category { get; set; }
        [AllowNull] public string? MainPicturePath { get; set; }
        [AllowNull,NotMapped] public ICollection<string>? PicturesPaths { get; set; }
        [Required,DefaultValue(1.0f)] public float Price { get; set;}

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [AllowNull] public DateTime CreatedDate { get; set; }
        [DefaultValue(true)] public bool DisplayOnStore { get; set; }
    }
}
