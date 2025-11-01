using BackendApp.Data;
using BackendApp.Helpers;
using BackendApp.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace BackendApp.Services
{
    public class AuthService
    {
        private readonly AppDbContext _context;

        public AuthService(AppDbContext context)
        {
            _context = context;
        }

        public string HashPassword(string password)
        {
            using var sha = SHA256.Create();
            return Convert.ToBase64String(sha.ComputeHash(Encoding.UTF8.GetBytes(password)));
        }

        public async Task<User> RegisterUser(User user)
        {
            user.PasswordHash = HashPassword(user.PasswordHash);
            user.EmailVerificationToken = TokenHelper.Base64UrlEncode(RandomNumberGenerator.GetBytes(64));
            user.IsEmailConfirmed = false;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<User> Authenticate(string email, string password)
        {
            var hash = HashPassword(password);
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email && u.PasswordHash == hash && u.IsEmailConfirmed);
            if (user != null)
                Console.WriteLine($"Login success: {user.Email}, IsAdmin={user.IsAdmin}");
            else
                Console.WriteLine($"Login failed: {email}, Hash={hash}");

            return user;
        }

        public async Task<User> GetUserById(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User?> VerifyEmailAsync(string token)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.EmailVerificationToken == token);
            if (user == null)
                return null;

            user.IsEmailConfirmed = true;
            user.EmailVerificationToken = null;
            await _context.SaveChangesAsync();

            return user;
        }
    }
}
