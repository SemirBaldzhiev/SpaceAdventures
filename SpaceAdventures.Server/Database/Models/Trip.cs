using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SpaceAdventures.Server.Database.Models
{
    public class Trip
    {
        public int Id { get; set; }
        public DateTime LaunchDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public double PricePerSeat { get; set; }
        public int AvailableSeats { get; set; }
        public int TotalSeats { get; set; }

        public string Department { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;

        public string ImageUrl { get; set; } = string.Empty;

        // relationship to Destination
        public int DestinationId { get; set; }

        // navigation property to Destination
        public Destination Destination { get; set; }

        // relationship to Spacecraft
        public int SpacecraftId { get; set; }

        // navigation property to Spacecraft
        public Spacecraft Spacecraft { get; set; }

    }
}
