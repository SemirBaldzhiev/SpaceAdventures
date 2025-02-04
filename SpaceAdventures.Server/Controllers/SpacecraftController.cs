using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpaceAdventures.Server.Database;
using SpaceAdventures.Server.Database.Models;

namespace SpaceAdventures.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize(Roles = "company")] // Uncomment if you want only 'company' role to access
    public class SpacecraftController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SpacecraftController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Spacecrafts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SpacecraftDto>>> GetAllSpacecrafts()
        {
            return await _context.Spacecrafts.Select(s => new SpacecraftDto
            {
                Id = s.Id,
                Name = s.Name,

            }).ToListAsync();
        }

        // GET: api/Spacecrafts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Spacecraft>> GetSpacecraft(int id)
        {
            var spacecraft = await _context.Spacecrafts.FindAsync(id);
            if (spacecraft == null)
            {
                return NotFound();
            }
            return spacecraft;
        }
    }

    public class SpacecraftDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}