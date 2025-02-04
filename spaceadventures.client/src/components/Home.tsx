import React from "react";
import "../styles/Home.css";
import { useUser } from '../context/UserContext';

function Home() {
    const popularTrips = [
        {
            name: "Mars Expedition",
            description: "Experience the red planet up close with our exclusive Mars Expedition.",
            image: "https://via.placeholder.com/300x200?text=Mars+Expedition"
        },
        {
            name: "Moon Adventure",
            description: "Walk on the Moon and explore the lunar landscape like never before.",
            image: "https://via.placeholder.com/300x200?text=Moon+Adventure"
        },
        {
            name: "Saturn Rings Cruise",
            description: "Take a breathtaking cruise around Saturn's rings.",
            image: "https://via.placeholder.com/300x200?text=Saturn+Rings+Cruise"
        }
    ];

    const { user } = useUser(); 

    let name = '';

    console.log("USER:");
    console.log(user);

    if (user !== null) {
       name = user.user.firstName + ' ' + user.user.lastName;
    }

    return (
        <div className="home">
            <header className="home-header">
                <h1>Welcome to Space Adventures Explorer {user === null ? "": name}</h1>
                <p>Discover the universe with our exclusive space travel experiences.</p>
            </header>

            <section className="popular-trips">
                <h2>Popular Trips</h2>
                <div className="trips-list">
                    {popularTrips.map((trip, index) => (
                        <div className="trip-card" key={index}>
                            <img src={trip.image} alt={trip.name} className="trip-image" />
                            <h3>{trip.name}</h3>
                            <p>{trip.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;