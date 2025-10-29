using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BackendApp.Models
{
    public class CartItem
    {
        [Key]
        public int Id { get; set; }

        //veza sa proizvodom
        public int ProductId { get; set; }

        [ForeignKey("ProductId")]
        
        public virtual Product? Product { get; set; }

        public int Quantity { get; set; }

        //veza sa korisnikom
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        
        public virtual User? User { get; set; }

    }
}