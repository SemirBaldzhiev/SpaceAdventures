using Microsoft.EntityFrameworkCore;
using SpaceAdventures.Server.Database.Models;

namespace SpaceAdventures.Server.Database
{
    public class DbInitializer
    {
        public static void Seed(ApplicationDbContext context)
        {
            // Ensure the database is created
            context.Database.EnsureCreated();


            if (!context.Destinations.Any())
            {
                context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Destinations ON");
                context.Destinations.AddRange(new[]
                {
                    new Destination
                    {
                        //Id = 1,
                        Name = "Mars",
                        Description = "Known as the Red Planet, Mars offers breathtaking landscapes and a once-in-a-lifetime experience.",
                        DistanceFromEarth = 54.6, // million kilometers
                        DurationToStay = 30, // days
                        Climate = "Cold and dry with occasional dust storms"
                    },
                    new Destination
                    {
                        //Id = 2,
                        Name = "Europa",
                        Description = "A moon of Jupiter, Europa is known for its vast oceans beneath the ice surface and potential for extraterrestrial life.",
                        DistanceFromEarth = 628.3, // million kilometers
                        DurationToStay = 14, // days
                        Climate = "Frozen with sub-surface oceans"
                    },
                    new Destination
                    {
                        //Id = 3,
                        Name = "Titan",
                        Description = "Saturn's largest moon, Titan, features methane lakes and a dense atmosphere, making it a unique destination.",
                        DistanceFromEarth = 1_222.0, // million kilometers
                        DurationToStay = 21, // days
                        Climate = "Cold with a thick nitrogen-rich atmosphere"
                    },
                    new Destination
                    {
                        //Id = 4,
                        Name = "Proxima Centauri b",
                        Description = "An exoplanet in the habitable zone of Proxima Centauri, offering a distant but exciting exploration opportunity.",
                        DistanceFromEarth = 4.24, // light-years
                        DurationToStay = 365, // days
                        Climate = "Unknown but potentially Earth-like"
                    },
                    new Destination
                    {
                        //Id = 5,
                        Name = "Venus",
                        Description = "Despite its harsh conditions, Venus offers an opportunity to study one of Earth's closest planetary neighbors.",
                        DistanceFromEarth = 261.0, // million kilometers
                        DurationToStay = 10, // days
                        Climate = "Extremely hot with dense, acidic clouds"
                    }
                });
                context.SaveChanges();
                context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Destinations OFF");
            }

            if (!context.Spacecrafts.Any())
            {
                context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Spacecrafts ON");
                context.Spacecrafts.AddRange(new[]
                {
                    new Spacecraft
                    {
                        //Id = 1,
                        Name = "Galaxy Explorer",
                        Capacity = 100,
                        Manufacturer = "SpaceX",
                        Features = "Advanced navigation system, anti-gravity chambers, spacious cabins",
                        Status = "Active",
                        Type = "Passenger Transport"
                    },
                    new Spacecraft
                    {
                        //Id = 2,
                        Name = "Lunar Voyager",
                        Capacity = 50,
                        Manufacturer = "Blue Origin",
                        Features = "High-speed travel, luxury amenities, reinforced hull for lunar dust protection",
                        Status = "Active",
                        Type = "Passenger Transport"
                    },
                    new Spacecraft
                    {
                        //Id = 3,
                        Name = "AstroMiner",
                        Capacity = 10,
                        Manufacturer = "NASA",
                        Features = "Mining tools, robotic arms, enhanced shielding for asteroid mining",
                        Status = "Operational",
                        Type = "Cargo/Mining"
                    },
                    new Spacecraft
                    {
                        //Id = 4,
                        Name = "Proxima Explorer",
                        Capacity = 20,
                        Manufacturer = "ESA",
                        Features = "Long-range communication, cryogenic chambers, sustainable life-support systems",
                        Status = "Under Maintenance",
                        Type = "Exploration"
                    },
                    new Spacecraft
                    {
                        //Id = 5,
                        Name = "Stellar Cargo",
                        Capacity = 200,
                        Manufacturer = "Boeing",
                        Features = "Large cargo hold, automated loading systems, solar-powered engines",
                        Status = "Active",
                        Type = "Cargo Transport"
                    }
                });
                context.SaveChanges();
                context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Spacecrafts OFF");
            }

            if (!context.Staffs.Any())
            {
                context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Staffs ON");
                context.Staffs.AddRange(new[]
                {
                    new Staff
                    {
                        //Id = 1,
                        Name = "John Doe",
                        Role = "Pilot",
                        AssignedSpacecraftId = 1 // Galaxy Explorer
                    },
                    new Staff
                    {
                        //Id = 2,
                        Name = "Jane Smith",
                        Role = "Engineer",
                        AssignedSpacecraftId = 1 // Galaxy Explorer
                    },
                    new Staff
                    {
                        //Id = 3,
                        Name = "Alice Johnson",
                        Role = "Scientist",
                        AssignedSpacecraftId = 2 // Lunar Voyager
                    },
                    new Staff
                    {
                        //Id = 4,
                        Name = "Bob Brown",
                        Role = "Technician",
                        AssignedSpacecraftId = 3 // AstroMiner
                    }
                 });

                context.SaveChanges();
                context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Staffs OFF");
            }

            if (!context.Trips.Any())
            {
                context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Trips ON");
                context.Trips.AddRange(new[]
                {
                    new Trip
                    {
                        //Id = 1,
                        LaunchDate = DateTime.UtcNow.AddMonths(1),
                        ReturnDate = DateTime.UtcNow.AddMonths(2),
                        PricePerSeat = 1000000, // $1,000,000
                        TotalSeats = 100,
                        AvailableSeats = 90,
                        DestinationId = 6, // Mars
                        SpacecraftId = 1,  // Galaxy Explorer
                        Department = "Interplanetary Travel",
                        Category = "Venus Expeditions",
                        ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/1920px-OSIRIS_Mars_true_color.jpg"
                    },
                    new Trip
                    {
                        //Id = 2,
                        LaunchDate = DateTime.UtcNow.AddMonths(3),
                        ReturnDate = DateTime.UtcNow.AddMonths(4),
                        PricePerSeat = 1500000, // $1,500,000
                        TotalSeats = 50,
                        AvailableSeats = 40,
                        DestinationId = 10, // Europa
                        SpacecraftId = 2, // Lunar Voyager
                        Department = "Interplanetary Travel",
                        Category = "Mars Trips",
                        ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Europa-moon.jpg/1920px-Europa-moon.jpg"
                    },
                    // New trips
                    new Trip
                    {
                        //Id = 3,
                        LaunchDate = DateTime.UtcNow.AddMonths(5),
                        ReturnDate = DateTime.UtcNow.AddMonths(6),
                        PricePerSeat = 2000000, // $2,000,000
                        TotalSeats = 75,
                        AvailableSeats = 65,
                        DestinationId = 9, // Europa
                        SpacecraftId = 3,  // Galaxy Explorer
                        Department = "Interplanetary Travel",
                        Category = "Venus Expeditions",
                        ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Europa-moon.jpg/1920px-Europa-moon.jpg"
                    },
                    new Trip
                    {
                        //Id = 4,
                        LaunchDate = DateTime.UtcNow.AddMonths(6),
                        ReturnDate = DateTime.UtcNow.AddMonths(7),
                        PricePerSeat = 800000, // $800,000
                        TotalSeats = 150,
                        AvailableSeats = 140,
                        DestinationId = 8, // Mars
                        SpacecraftId = 4,  // Lunar Voyager
                        Department = "Galactic Exploration",
                        Category = "Moon Expeditions",
                        ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/1920px-OSIRIS_Mars_true_color.jpg"
                    },
                    new Trip
                    {
                        //Id = 5,
                        LaunchDate = DateTime.UtcNow.AddMonths(2),
                        ReturnDate = DateTime.UtcNow.AddMonths(3),
                        PricePerSeat = 2500000, // $2,500,000
                        TotalSeats = 20,
                        AvailableSeats = 18,
                        DestinationId = 7, // Europa
                        SpacecraftId = 5,  // Lunar Voyager
                        Department = "Galactic Exploration",
                        Category = "Asteroid Belt Exploration",
                        ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Europa-moon.jpg/1920px-Europa-moon.jpg"

                    },
                    new Trip
                    {
                        //Id = 6,
                        LaunchDate = DateTime.UtcNow.AddMonths(8),
                        ReturnDate = DateTime.UtcNow.AddMonths(9),
                        PricePerSeat = 3000000, // $3,000,000
                        TotalSeats = 30,
                        AvailableSeats = 28,
                        DestinationId = 6, // Mars
                        SpacecraftId = 1,  // Galaxy Explorer
                        Department = "Interplanetary Travel",
                        Category = "Mars Trips",
                        ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/1920px-OSIRIS_Mars_true_color.jpg"

                    }
                });

                context.SaveChanges();
                context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Trips OFF");
            }


        }
    }
}
