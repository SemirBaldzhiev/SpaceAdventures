namespace SpaceAdventures.Server.Database.Models
{
    public class Staff
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Role { get; set; }

        public int AssignedSpacecraftId { get; set; }
        public Spacecraft AssignedSpacecraft { get; set; }
    }
}
