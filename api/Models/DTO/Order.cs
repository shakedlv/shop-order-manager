using api.Models.Enums;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
namespace api.Models.DTO
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public string UserPhone { get; set; }
        public int BranchId { get; set; }
        public virtual Branch Branch { get; set; } = null!; 
        public DateTime PickUpDate { get; set; }
        public bool IsPaid { get; set; }
        public OrderStatus Status { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)] public DateTime CreatedDate { get; set; }
        public  List<OrderItem> OrderItems { get; set; } = new();
    }
}
