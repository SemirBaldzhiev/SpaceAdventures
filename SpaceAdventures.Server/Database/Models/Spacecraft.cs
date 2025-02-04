namespace SpaceAdventures.Server.Database.Models
{
    public class Spacecraft
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;
        public int Capacity { get; set; }
        public string Manufacturer { get; set; } = string.Empty;

        public string Features { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;

        public string Type { get; set; } = string.Empty;
    }
}
