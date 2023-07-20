using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api.Models.DTO
{
    public class Cart
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }  

        [ForeignKey("OrderProductId")]
        public ICollection<OrderProduct> CartItems { get; set; }

        [ForeignKey("BranchId")]
        public Branch PickUpLocation { get; set; }

        public DateTime PickupTime { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedDate { get; set; }
    }
}
