using Microsoft.AspNetCore.Identity;

namespace SpaceAdventures.Server.Database.Models
{
    public class Booking
    {
        public int Id { get; set; }

        public DateOnly BookingDate { get; set; }
        public decimal TotalAmount { get; set; }

        public int TripId { get; set; }
        public Trip Trip { get; set; }

        public string UserId { get; set; } = string.Empty;
        public ApplicationUser User { get; set; }

        public string PaymentStatus { get; set; } = string.Empty;
    }
}
