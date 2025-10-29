using BackendApp.Data;
using BackendApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;
    public ProductsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
        return await _context.Products.ToListAsync();
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
        var product = await _context.Products.FindAsync(id);
        if (product == null)
        {
            return NotFound();
        }
        return Ok(product);
    }
}
