using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Stripe;
using SpaceAdventures.Server.Database;
using SpaceAdventures.Server.Database.Models;
using SpaceAdventures.Server.Dtos;
using SpaceAdventures.Server.Utils;

namespace SpaceAdventures.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public BookingController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateBooking([FromBody] BookingRequest request)
        {
            try
            {
                var booking = new Booking
                {
                    UserId = request.UserId,
                    TripId = request.TripId,
                    BookingDate = DateOnly.FromDateTime(DateTime.UtcNow),
                    TotalAmount = request.TotalAmount,
                    PaymentStatus = request.PaymentStatus
                };


                if (booking == null)
                {
                    return BadRequest("Cannot create booking");
                }

                _context.Bookings.Add(booking);

                Trip trip = _context.Trips.Find(request.TripId);

                if (trip != null)
                {
                    trip.AvailableSeats -= request.NumberOfSeats;
                }

                await _context.SaveChangesAsync();

                return Ok(new
                {
                    Message = "Booking and payment successful.",
                    BookingId = booking.Id,
                    booking
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }


        [HttpGet("user-bookings/{userId}")]
        public async Task<IActionResult> GetUserBookings(string userId)
        {
            var bookings = await _context.Bookings
                .Where(b => b.UserId == userId)
                .Select(b => new
                {
                    b.Id,
                    TripName = b.Trip.Destination.Name,
                    b.Trip.LaunchDate,
                    b.Trip.ReturnDate,
                    b.Trip.Destination.DurationToStay,
                    b.TotalAmount,
                    b.BookingDate,
                    b.PaymentStatus,
                })
                .ToListAsync();

            if (!bookings.Any())
            {
                return NotFound("No bookings found.");
            }

            return Ok(bookings);
        }
    }
}
