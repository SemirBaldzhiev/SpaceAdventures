using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using SpaceAdventures.Server.Database;
using SpaceAdventures.Server.Database.Models;
using SpaceAdventures.Server.Dtos;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly ApplicationDbContext _context;
    private readonly IPasswordHasher<ApplicationUser> _passwordHasher;
    private readonly IConfiguration _configuration;

    public AccountController(
        UserManager<ApplicationUser> userManager, 
        RoleManager<IdentityRole> roleManager, 
        ApplicationDbContext context, IPasswordHasher<ApplicationUser> hasher,
        IConfiguration config)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _context = context;
        _passwordHasher = hasher;
        _configuration = config;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequestDto request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        if (request.Password != request.ConfirmPassword)
        {
            return BadRequest(ModelState);
        }

        var user = new ApplicationUser
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            UserName = request.Email,
            CompanyName = request.CompanyName
        };

        user.PasswordHash = _passwordHasher.HashPassword(user, request.Password);


        var result = await _userManager.CreateAsync(user, request.Password);
        
        if (!result.Succeeded)
        {
            return BadRequest("Error");
        }

        if (!await _roleManager.RoleExistsAsync(request.UserRole))
        {
            var role = new IdentityRole { Name = request.UserRole, NormalizedName = request.UserRole };
            await _roleManager.CreateAsync(role);
        }

        if (result.Succeeded)
        {
            await _userManager.AddToRoleAsync(user, request.UserRole);

            //// Optionally sign in the user after registration
            //await _signInManager.SignInAsync(user, isPersistent: false);
        }

        if (result.Succeeded)
        {
            return Ok(new { message = $"User registered successfully as {request.UserRole}." });
        }

        foreach (var error in result.Errors)
        {
            ModelState.AddModelError(string.Empty, error.Description);
        }

        return BadRequest(ModelState);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        if (request == null || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
        {
            return BadRequest(new { message = "Email and Password are required." });
        }

        // Fetch user from database
        var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == request.Email);

        if (user == null || _passwordHasher.VerifyHashedPassword(user, user.PasswordHash ?? string.Empty, request.Password) != PasswordVerificationResult.Success)
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        // Generate JWT token
        var token = GenerateJwtToken(user.Email ?? string.Empty, user.FirstName);

        return Ok(new { token, user });
    }
    private string GenerateJwtToken(string email, string name)
    {
        var secretKey = _configuration["Jwt:SecretKey"];
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey ?? string.Empty)); // Replace with a secure key
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.Name, name)
            };

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }


    [HttpGet("get-user-info/{userId}")]
    public async Task<IActionResult> GetUserInfo(string userId)
    {
        var user = await _context.ApplicationUsers.FindAsync(userId);

        if (user == null)
        {
            return NotFound("User not found.");
        }

        return Ok(new
        {
            user.FirstName,
            user.LastName,
            user.Email
        });
    }


    [HttpPost("logout")]
    public IActionResult Logout()
    {
        // Here we simply return a message to tell the client to delete the token
        return Ok(new { message = "Successfully logged out. Please remove the token from client-side storage." });
    }


}
