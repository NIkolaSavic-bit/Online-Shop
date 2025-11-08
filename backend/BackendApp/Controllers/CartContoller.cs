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
                     .ThenInclude(p => p.ProductImages)
                     .Include(c => c.Product)
                     .ThenInclude(p => p.ProductSizes)
                 .Where(c => c.UserId == userId)

                 .Select(c => new
                 {
                     c.Id,
                     c.Quantity,
                     c.Size,
                     c.ProductId,
                     Product = new
                     {
                         c.Product.Id,
                         c.Product.Name,
                         c.Product.Category,
                         c.Product.NewPrice,
                         c.Product.OldPrice,
                         Images = c.Product.ProductImages.Select(pi => pi.ImagePath), // <-- niz putanja
                         MaxQuantity = c.Product.ProductSizes
                             .Where(ps => ps.Size == c.Size)
                             .Select(ps => ps.Quantity)
                             .FirstOrDefault()
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
            var item = await _context.CartItems
         .Include(c => c.Product)
         .ThenInclude(p => p.ProductSizes)
         .FirstOrDefaultAsync(c => c.Id == id);

            if (item == null) return NotFound();

            // Vrati količinu nazad u ProductSizes
            var productSize = item.Product.ProductSizes.FirstOrDefault(ps => ps.Size == item.Size);
            if (productSize != null)
            {
                productSize.Quantity += item.Quantity;
            }

            _context.CartItems.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // PUT: api/cart/{id}
        // Ažurira količinu proizvoda u korpi
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQuantity(int id, [FromBody] int newQuantity)
        {
            var item = await _context.CartItems
                .Include(c => c.Product)
                .ThenInclude(p => p.ProductSizes)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (item == null)
                return NotFound("Proizvod nije pronađen u korpi.");

            // Pronađi ProductSize odgovarajuće veličine
            var productSize = item.Product.ProductSizes.FirstOrDefault(ps => ps.Size == item.Size);
            if (productSize == null)
                return BadRequest("Veličina nije dostupna.");

            int quantityDifference = newQuantity - item.Quantity;

            // Ako povećavamo količinu, proveravamo da li ima dovoljno na stanju
            if (quantityDifference > 0 && productSize.Quantity < quantityDifference)
                return BadRequest("Nema dovoljno proizvoda na stanju.");

            // Ažuriramo količine
            productSize.Quantity -= quantityDifference;
            item.Quantity = newQuantity;

            await _context.SaveChangesAsync();

            return Ok(item);
        }

    }
}
