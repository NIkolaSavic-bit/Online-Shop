using Microsoft.AspNetCore.Mvc;

public class ProductSizeDto
{
    public string Size { get; set; } = string.Empty;
    public int Quantity { get; set; }
}

public class ProductCreateDto
{
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public decimal NewPrice { get; set; }
    public decimal OldPrice { get; set; }
    public int UserId { get; set; }

    public List<IFormFile> ImageFiles { get; set; } = new List<IFormFile>();
    [FromForm]
    public List<ProductSizeDto> Sizes { get; set; } = new List<ProductSizeDto>();
    

}