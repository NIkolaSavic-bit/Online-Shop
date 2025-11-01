using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace BackendApp.Models
{
    public class ProductCreateDto
    {
        public string Name { get; set; } = null!;
        public string Category { get; set; } = null!;
        public decimal NewPrice { get; set; }
        public decimal OldPrice { get; set; }
        public int Stock { get; set; }
        public string? Sizes { get; set; }
        public int UserId { get; set; }
        public List<IFormFile>? ImageFiles { get; set; } = new List<IFormFile>();
    }
}
