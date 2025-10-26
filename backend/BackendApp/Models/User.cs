namespace BackendApp.Models
{
    public class User
    {
        public int Id { get; set; }          // Primary key
        public string Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
    }
}
