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

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetCart(int userId)
        {
            var cart = await _context.CartItems
                .Include(c => c.Product)
                .Where(c => c.UserId == userId)
                .ToListAsync();

            return Ok(cart);
        }

        [HttpPost]
        public async Task<IActionResult> AddToCart([FromBody] CartItem item)
        {
            // proveri da li vec postoji isti proizvod u korpi istog korisnika
            var existing = await _context.CartItems
                .FirstOrDefaultAsync(c => c.UserId == item.UserId && c.ProductId == item.ProductId);

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
