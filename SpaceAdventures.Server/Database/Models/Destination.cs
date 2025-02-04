namespace SpaceAdventures.Server.Database.Models
{
    public class Destination
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double DistanceFromEarth { get; set; }
        public int DurationToStay { get; set; }
        public string Climate { get; set; } = string.Empty;
    }
}
