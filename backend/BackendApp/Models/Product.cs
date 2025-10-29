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

        //isti id za slike
       
    }
}
