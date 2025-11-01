using BackendApp.Data;
using BackendApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _context;

        //Veza sa bazom podataka
        public CartController(AppDbContext context)
        {
            _context = context;
        }
        //da mogu da pristupim korpi korisnika
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetCart(int userId)
        {
            var cart = await _context.CartItems
                .Include(c => c.Product)
                .Where(c => c.UserId == userId)
                .Select(c => new
                {
                    c.Id,
                    c.Quantity,
                    c.Size, // prikazuje veličinu
                    c.ProductId,
                    Product = new
                    {
                        c.Product.Id,
                        c.Product.Name,
                        c.Product.Category,
                        c.Product.Image,
                        c.Product.NewPrice,
                        c.Product.OldPrice
                    }
                })
                .ToListAsync();

            return Ok(cart);
        }
        //dodaje producte u cart
        [HttpPost]
        public async Task<IActionResult> AddToCart([FromBody] CartItem item)
        {
            var productSize = await _context.ProductSizes
        .FirstOrDefaultAsync(ps => ps.ProductId == item.ProductId && ps.Size == item.Size);

            if (productSize == null)
                return BadRequest("Ova veličina nije dostupna.");

            if (productSize.Quantity < item.Quantity)
                return BadRequest("Nema dovoljno proizvoda na stanju.");

            // smanji količinu u ProductSizes
            productSize.Quantity -= item.Quantity;

            // proveri da li vec postoji isti proizvod iste veličine u korpi
            var existing = await _context.CartItems
                .FirstOrDefaultAsync(c => c.UserId == item.UserId && c.ProductId == item.ProductId && c.Size == item.Size);

            if (existing != null)
            {
                existing.Quantity += item.Quantity;
            }
            else
            {
                _context.CartItems.Add(item);
            }

            await _context.SaveChangesAsync();
            return Ok(item);
        }

        //uklanja product iz cart
        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveFromCart(int id)
        {
            var item = await _context.CartItems.FindAsync(id);
            if (item == null) return NotFound();

            _context.CartItems.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
