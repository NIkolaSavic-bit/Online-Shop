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
    public async Task<ActionResult<IEnumerable<ProductReadDto>>> GetProductsByCategory(string category, [FromQuery] string sort = "")
    {
        var productsQuery = _context.Products
            .Where(p => p.Category.ToLower() == category.ToLower())
            .Include(p => p.ProductImages)
            .Include(p => p.ProductSizes)
            .AsQueryable();


        productsQuery = sort.ToLower() switch
        {
            "price_asc" => productsQuery.OrderBy(p => p.NewPrice),
            "price_desc" => productsQuery.OrderByDescending(p => p.NewPrice),
            "date_asc" => productsQuery.OrderBy(p => p.CreatedAt),
            "date_desc" => productsQuery.OrderByDescending(p => p.CreatedAt),
            _ => productsQuery
        };

        var products = await productsQuery.ToListAsync();

        var result = products.Select(p => new ProductReadDto
        {
            Id = p.Id,
            Name = p.Name,
            Category = p.Category,
            NewPrice = p.NewPrice,
            OldPrice = p.OldPrice,
            CreatedAt = p.CreatedAt,
            Images = p.ProductImages.Select(pi => pi.ImagePath),
            Sizes = p.ProductSizes.Select(ps => new ProductSizeDto { Size = ps.Size, Quantity = ps.Quantity })
        });

        return Ok(result);
    }

    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<ProductReadDto>>> SearchProducts([FromQuery] string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            return BadRequest("Query parameter 'name' is required.");

        var products = await _context.Products
            .Where(p => p.Name.ToLower().Contains(name.ToLower()))
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
        Console.WriteLine($"Broj veličina: {dto.Sizes.Count}");

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

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePrice(int id, [FromBody] UpdatePrice updatePrice)
    {
        var product = await _context.Products.FindAsync(id);
        var user = await _context.Users.FindAsync(updatePrice.UserId);
        if (user == null || !user.IsAdmin)
        {
            return Unauthorized("Samo admin moze da menja cenu prozvoda");
        }

        if (product == null)
        {
            return NotFound("Proizvod nije pronadjen!");
        }
        product.OldPrice = product.NewPrice;

        product.NewPrice = updatePrice.NewPrice;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Cena je uspesno promenjena",
            id = product.Id,
            oldPrice = product.OldPrice,
            newPrice = product.NewPrice
        });
    }

    [HttpPut("{id}/quantity")]
    public async Task<IActionResult> UpdateQuantity(int id, [FromBody] UpdateQuantityDTO dto)
    {
        var product = await _context.Products
            .Include(p => p.ProductSizes)
            .FirstOrDefaultAsync(p => p.Id == id);

        var user = await _context.Users.FindAsync(dto.UserId);

        if (user == null || !user.IsAdmin)
            return Unauthorized("Samo admin moze da menja kolicinu proizvoda");

        if (product == null)
            return NotFound("Proizvod nije pronadjen!");

        // Pronađi veličinu koju admin želi da menja
        var productSize = product.ProductSizes.FirstOrDefault(ps => ps.Size == dto.Size);
        if (productSize == null)
            return NotFound("Ova veličina nije pronađena za proizvod");

        productSize.Quantity = dto.Quantity;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Količina uspešno promenjena",
            productId = product.Id,
            size = productSize.Size,
            quantity = productSize.Quantity
        });
    }



}
