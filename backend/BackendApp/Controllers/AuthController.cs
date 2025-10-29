using BackendApp.DTOs;
using BackendApp.Models;
using BackendApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace BackendApp.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class AuthController : ControllerBase
	{
		private readonly AuthService _authService;

		public AuthController(AuthService authService)
		{
			_authService = authService;
		}

		[HttpPost("register")]
		public async Task<IActionResult> Register([FromBody] UserRegisterDto dto)
		{
			var user = new User
			{
				Name = dto.Name,
				Email = dto.Email,
				PasswordHash = dto.Password
			};

			await _authService.RegisterUser(user);
			return Ok(new { message = "User created" });
		}

		[HttpPost("login")]
		public async Task<IActionResult> Login([FromBody] UserLoginDto dto)
		{
			var user = await _authService.Authenticate(dto.Email, dto.Password);
			if (user == null) return BadRequest("Invalid email or password.");
			//da vraca token
			return Ok(new { message = "Login successful", userId = user.Id });
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetUser(int id)
		{
			var user = await _authService.GetUserById(id);
			if (user == null)
				return NotFound("User not found");

			return Ok(new { id = user.Id, name = user.Name, email = user.Email });
		}

	}
}
