namespace SpaceAdventures.Server.Dtos
{
    public class BookingRequest
    {
        public string UserId { get; set; } = string.Empty;
        public int TripId { get; set; }
        public decimal TotalAmount { get; set; }
        public string PaymentStatus { get; set; } = string.Empty;
        public int NumberOfSeats { get; set; }

    }
}
