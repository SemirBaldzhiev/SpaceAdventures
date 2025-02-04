using Microsoft.AspNetCore.Identity.Data;

namespace SpaceAdventures.Server.Dtos
{
    public class RegisterRequestDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }

        public string CompanyName { get; set; }

        public string UserRole { get; set; }

    }
}
