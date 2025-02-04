import '../styles/TripCard.css'
import { useNavigate } from 'react-router-dom';

const TripCard = ({ trip, user }) => {

    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/trips/${trip.id}`);
    }

    const handleBookNow = () => {
        if (!user) {
            navigate('/login');
        }
        else { 
            navigate('/booking', { state: { trip } });
        }
    };


    return (
        <div className="trip-card">
            <img src={trip.imageUrl} alt={trip.name} className="trip-image" />
            <h4>Destination: {trip.destination.name}</h4>
            <p>Price: {trip.pricePerSeat}</p>
            <button className="book-button" onClick={handleBookNow}>Book Now</button>
            <button className="details-button" onClick={handleViewDetails}>View Details</button>
        </div>
    );
};

export default TripCard;
