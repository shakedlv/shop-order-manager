using api.Models.Enums;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
namespace api.Models.DTO
{
    public class Order
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int UserId { get; set; }
        public string UserPhone { get; set; }
        public int BranchId { get; set; }
        public DateTime PickUpDate { get; set; }
        public bool IsPaid { get; set; }
        public OrderStatus Status { get; set; }
        public DateTime Created { get; set; }

    }
}
