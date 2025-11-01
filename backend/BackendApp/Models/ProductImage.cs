namespace BackendApp.Models
{
    public class ProductImage
    {
        public int Id { get; set; }
        public string ImagePath { get; set; } = string.Empty;

        // Veza sa proizvodom
        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;
    }
}
