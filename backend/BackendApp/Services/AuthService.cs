using BackendApp.Data;
using BackendApp.Models;
using BackendApp.Services;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;


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
			_context.Users.Add(user);
			await _context.SaveChangesAsync();
			return user;
		}

		public async Task<User> Authenticate(string email, string password)
		{
			var hash = HashPassword(password);
			return await _context.Users
				.FirstOrDefaultAsync(u => u.Email == email && u.PasswordHash == hash);
		}
		public async Task<User> GetUserById(int id)
		{
			return await _context.Users.FindAsync(id);
		}

	}
}
