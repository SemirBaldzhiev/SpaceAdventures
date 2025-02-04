using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpaceAdventures.Server.Database;
using SpaceAdventures.Server.Database.Models;

namespace SpaceAdventures.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize(Roles = "company")] // Uncomment if you want only 'company' role to access
    public class DestinationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DestinationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Destinations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DestinationDto>>> GetAllDestinations()
        {
            return await _context.Destinations.Select(d => new DestinationDto { Id = d.Id, Name = d.Name }).ToListAsync();
        }

        // If you want an individual GET by ID, you can add:
        // GET: api/Destinations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Destination>> GetDestination(int id)
        {
            var destination = await _context.Destinations.FindAsync(id);
            if (destination == null)
            {
                return NotFound();
            }
            return destination;
        }

    }

    public class DestinationDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}