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
        private readonly EmailService _emailService;

        public AuthController(AuthService authService, EmailService emailService)
        {
            _authService = authService;
            _emailService = emailService;
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


            var newUser = await _authService.RegisterUser(user);

            // Kreiraj link za verifikaciju
            var verifyUrl = $"http://localhost:5145/api/auth/verify?token={newUser.EmailVerificationToken}";
            var subject = "Email Verification";
            var message = $"<h3>Welcome {newUser.Name}!</h3>" +
                          $"<p>Please verify your account by clicking the link below:</p>" +
                          $"<a href='{verifyUrl}'>Verify Email</a>";

            await _emailService.SendEmailAsync(newUser.Email, subject, message);


            return Ok(new
            {
                message = "User created successfully! Please verify your email.",
                verifyLink = verifyUrl
            });
        }

        [HttpGet("verify")]
        public async Task<IActionResult> VerifyEmail([FromQuery] string token)
        {
            if (string.IsNullOrEmpty(token))
                return BadRequest(new { message = "Missing token." });

            var user = await _authService.VerifyEmailAsync(token);
            if (user == null)
                return BadRequest(new { message = "Invalid or expired token." });

            return Ok(new { message = "Email verified successfully! You can now log in." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto dto)
        {
            var user = await _authService.Authenticate(dto.Email, dto.Password);
            if (user == null)
                return BadRequest(new { message = "Invalid email, password, or unverified account." });

            return Ok(new
            {
                message = "Login successful",
                userId = user.Id,
                isAdmin = user.IsAdmin
            });

        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _authService.GetUserById(id);
            if (user == null) return NotFound();

            return Ok(new
            {
                user.Id,
                user.Name,
                user.Email,
                user.IsAdmin
            });
        }
    }
}
