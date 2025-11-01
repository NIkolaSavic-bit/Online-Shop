namespace BackendApp.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public decimal NewPrice { get; set; }
        public decimal OldPrice { get; set; }
        public DateTime CreatedAt { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; } = null!;

        // Umesto stringa i ukupnog Stock-a
        public ICollection<ProductSize> ProductSizes { get; set; } = new List<ProductSize>();

        public ICollection<ProductImage> ProductImages { get; set; } = new List<ProductImage>();



    }
}
