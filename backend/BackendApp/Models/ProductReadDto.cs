public class ProductReadDto
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Category { get; set; } = "";
    public decimal NewPrice { get; set; }
    public decimal OldPrice { get; set; }
    public IEnumerable<string> Images { get; set; } = new List<string>();
    public IEnumerable<ProductSizeDto> Sizes { get; set; } = new List<ProductSizeDto>();
}
