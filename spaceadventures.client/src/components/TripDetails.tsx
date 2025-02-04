import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/TripDetails.css'
import { useUser } from '../context/UserContext';

const TripDetails = () => {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { user } = useUser();

    useEffect(() => {
        const fetchTripDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://localhost:7234/api/Trip/${tripId}`);
                if (!response.ok) throw new Error('Failed to fetch trip details');
                const data = await response.json();
                setTrip(data);
                console.log(data)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTripDetails();
    }, [tripId]);

    const handleBookNow = () => {
        if (!user) {
            navigate('/login');
        }
        else {
            navigate('/booking', { state: { trip } });
        }
    }

    if (loading) return <p>Loading trip details...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!trip) return <p>Trip not found.</p>;

    return (
        <div className="trip-details">
            <h1>{}</h1>
            <p><strong>Destination:</strong> {trip.destination.name}</p>
            <p><strong>Duration:</strong> {trip.destination.durationToStay} days</p>
            <p><strong>Launch Date:</strong> {new Date(trip.launchDate).toLocaleDateString()}</p>
            <p><strong>Price:</strong> ${trip.pricePerSeat}</p>
            <p><strong>Description:</strong> {trip.destination.description}</p>
            <button onClick={handleBookNow}>Book Now</button>
        </div>
    );
};

export default TripDetails;