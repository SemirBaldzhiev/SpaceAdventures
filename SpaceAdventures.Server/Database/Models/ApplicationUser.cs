using Microsoft.AspNetCore.Identity;

namespace SpaceAdventures.Server.Database.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string CompanyName { get; set; }

        public List<Booking> Bookings { get; set; } = new List<Booking>();

    }
}
