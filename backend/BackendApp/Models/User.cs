namespace BackendApp.Models
{
    public class User
    {
        public int Id { get; set; }          // Primary key
        public string Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }

        public bool IsEmailConfirmed { get; set; } = false;

        public string? EmailVerificationToken { get; set; }

        public bool IsAdmin { get; set; } = false;
        //1 korisnik moze imati vise stavki u korpi
        public ICollection<CartItem>? CartItems { get; set; }
        public ICollection<Product> Products { get; set; } = new List<Product>();

    }
}
