using BackendApp.Data;
using BackendApp.Services;
using BackendApp.Models;

public static class AdminSeeder
{
    public static void SeedAdmin(AppDbContext context)
    {

        if (context.Users.Any(u => u.Email == "admin@gmail.com"))
            return;

        var authService = new AuthService(context);
        var admin = new User
        {
            Name = "Administrator",
            Email = "admin@gmail.com",
            PasswordHash = authService.HashPassword("admin"),
            IsEmailConfirmed = true,
            IsAdmin = true
        };

        context.Users.Add(admin);
        context.SaveChanges();
    }
}
