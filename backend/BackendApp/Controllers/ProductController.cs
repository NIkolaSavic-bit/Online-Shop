using BackendApp.Data;
using BackendApp.Models;
using BackendApp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ImageService _imageService;
    public ProductsController(AppDbContext context, ImageService imageService)
    {
        _context = context;
        _imageService = imageService;
    }

    [HttpGet]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductReadDto>>> GetProducts()
    {
        var products = await _context.Products
            .Include(p => p.ProductImages)
            .Include(p => p.ProductSizes)
            .ToListAsync();

        var result = products.Select(p => new ProductReadDto
        {
            Id = p.Id,
            Name = p.Name,
            Category = p.Category,
            NewPrice = p.NewPrice,
            OldPrice = p.OldPrice,
            Images = p.ProductImages.Select(pi => pi.ImagePath),
            Sizes = p.ProductSizes.Select(ps => new ProductSizeDto { Size = ps.Size, Quantity = ps.Quantity })
        });

        return Ok(result);
    }

    [HttpGet("category/{category}")]
    public async Task<ActionResult<IEnumerable<Product>>> GetProductsByCategory(string category)
    {
        var products = await _context.Products
            .Where(p => p.Category.ToLower() == category.ToLower())
            .ToListAsync();

        return products;
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetProduct(int id)
    {
        var product = await _context.Products
        .Include(p => p.ProductImages)
        .Include(p => p.ProductSizes)
        .FirstOrDefaultAsync(p => p.Id == id);

        if (product == null)
            return NotFound();

        return Ok(product);
    }

    [HttpPost]
    [RequestSizeLimit(20_000_000)]
    public async Task<IActionResult> AddProduct([FromForm] ProductCreateDto dto)
    {
        var user = await _context.Users.FindAsync(dto.UserId);
        if (user == null || !user.IsAdmin)
            return Unauthorized("Only administrators can add products.");

        if (dto.ImageFiles == null || !dto.ImageFiles.Any())
            return BadRequest("Morate poslati bar jednu sliku.");

        var product = new Product
        {
            Name = dto.Name,
            Category = dto.Category,
            NewPrice = dto.NewPrice,
            OldPrice = dto.OldPrice,
            CreatedAt = DateTime.UtcNow,
            UserId = dto.UserId
        };

        // Dodaj slike
        Console.WriteLine($"Broj fajlova: {dto.ImageFiles?.Count}");
        foreach (var file in dto.ImageFiles)
        {
            var path = _imageService.SaveImage(file);
            Console.WriteLine($"jebeni put: {path}"); // Dodaj log da vidiš šta vraća
            product.ProductImages.Add(new ProductImage { ImagePath = path });
        }

        // Dodaj veličine

        foreach (var s in dto.Sizes)
        {
            product.ProductSizes.Add(new ProductSize
            {
                Size = s.Size,
                Quantity = s.Quantity
            });
        }

        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        var test = await _context.ProductImages.Where(pi => pi.ProductId == product.Id).ToListAsync();
        Console.WriteLine($"Broj slika u bazi: {test.Count}");




        return Ok(new
        {
            product.Id,
            product.Name,
            product.Category,
            product.NewPrice,
            product.OldPrice,
            Images = product.ProductImages.Select(pi => pi.ImagePath),
            Sizes = product.ProductSizes.Select(ps => new { ps.Size, ps.Quantity })
        });
    }



    [HttpPost("{productId}/images")]
    public async Task<IActionResult> AddImages(int productId, [FromForm] List<IFormFile> images)
    {
        var product = await _context.Products.FindAsync(productId);
        if (product == null)
            return NotFound("Proizvod nije pronađen.");

        foreach (var image in images)
        {
            if (image.Length > 0)
            {
                var imagePath = _imageService.SaveImage(image);
                product.ProductImages.Add(new ProductImage
                {
                    ImagePath = imagePath
                });
            }
        }

        await _context.SaveChangesAsync();

        return Ok(product.ProductImages.Select(pi => pi.ImagePath));
    }


}
