import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import '../styles/CreateTrip.css';
import { useUser } from '../context/UserContext';

/** 
 * Basic shape of data for destinations and spacecrafts
 * returned by your backend. You can rename fields 
 * if your API returns different property names.
 */
interface Destination {
    id: number;
    name: string;
}

interface Spacecraft {
    id: number;
    name: string;
}

/**
 * Represents the data needed to create a Trip.
 * Adjust to match your backend model.
 */
interface CreateTrip {
    launchDate: string;
    returnDate: string;
    pricePerSeat: number;
    availableSeats: number;
    totalSeats: number;
    department: string; // or department if needed
    category: string;   // or category if needed
    imageUrl: string;

    destinationId: number;
    spacecraftId: number;
}

const departments = [
    { id: 1, name: 'Interplanetary Travel' },
    { id: 2, name: 'Galactic Exploration' },
];

const categories = [
    { id: 1, name: 'Moon Expeditions' },
    { id: 2, name: 'Asteroid Belt Exploration' },
];

const CreateTrip: React.FC = () => {
    // State for the Trip form
    const [trip, setTrip] = useState<CreateTrip>({
        launchDate: '',
        returnDate: '',
        pricePerSeat: 0,
        availableSeats: 0,
        totalSeats: 0,
        department: "",
        category: "",
        imageUrl: '',
        destinationId: 0,
        spacecraftId: 0
    });

    // State to store fetched destinations and spacecrafts
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [spacecrafts, setSpacecrafts] = useState<Spacecraft[]>([]);
    const { user } = useUser();

    /**
     * Fetch the possible destinations and spacecrafts on component mount.
     */
    useEffect(() => {
        const token = localStorage.getItem('token') || '';

        // Fetch destinations
        fetch('https://localhost:7234/api/Destinations', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch destinations');
                }
                return res.json();
            })
            .then((data: Destination[]) => {
                setDestinations(data);
            })
            .catch((err) => {
                console.error(err);
                alert('Error fetching destinations');
            });

        // Fetch spacecrafts
        fetch('https://localhost:7234/api/Spacecraft', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch spacecrafts');
                }
                return res.json();
            })
            .then((data: Spacecraft[]) => {
                setSpacecrafts(data);
            })
            .catch((err) => {
                console.error(err);
                alert('Error fetching spacecrafts');
            });
    }, []);

    /**
     * Handle input/select changes. Convert numeric fields to numbers.
     */
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setTrip((prevTrip) => {
            if (
                name === 'pricePerSeat' ||
                name === 'availableSeats' ||
                name === 'totalSeats' ||
                name === 'department' ||
                name === 'category' ||
                name === 'destinationId' ||
                name === 'spacecraftId'
            ) {
                return { ...prevTrip, [name]: parseFloat(value) || 0 };
            }
            return { ...prevTrip, [name]: value };
        });
    };

    /**
     * Handle form submission (POST /trips).
     */
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log(user.token);
            const response = await fetch('https://localhost:7234/api/Trip', {
                method: 'POST',
                mode: "no-cors",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify(trip)
            });

            console.log(response.body);

            if (!response.ok) {
                const msg = await response.text();
                throw new Error(`Error creating trip: ${response.status} - ${msg}`);
            }

            const createdTrip = await response.json();
            console.log('Trip created successfully:', createdTrip);
            alert('Trip created successfully!');

            // Reset form
            setTrip({
                launchDate: '',
                returnDate: '',
                pricePerSeat: 0,
                availableSeats: 0,
                totalSeats: 0,
                department: "",
                category: "",
                imageUrl: '',
                destinationId: 0,
                spacecraftId: 0
            });
        } catch (error) {
            console.error(error);
            alert(`Failed to create trip. ${(error as Error).message}`);
        }
    };

    return (
        <div className="createTripContainer">
            <h1>Create a New Trip</h1>
            <form onSubmit={handleSubmit}>
                {/* Launch Date */}
                <div className="formGroup">
                    <label htmlFor="launchDate">Launch Date</label>
                    <input
                        type="date"
                        id="launchDate"
                        name="launchDate"
                        value={trip.launchDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Return Date */}
                <div className="formGroup">
                    <label htmlFor="returnDate">Return Date</label>
                    <input
                        type="date"
                        id="returnDate"
                        name="returnDate"
                        value={trip.returnDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Price Per Seat */}
                <div className="formGroup">
                    <label htmlFor="pricePerSeat">Price Per Seat</label>
                    <input
                        type="number"
                        id="pricePerSeat"
                        name="pricePerSeat"
                        value={trip.pricePerSeat}
                        onChange={handleChange}
                        step="any"
                        required
                    />
                </div>

                {/* Available Seats */}
                <div className="formGroup">
                    <label htmlFor="availableSeats">Available Seats</label>
                    <input
                        type="number"
                        id="availableSeats"
                        name="availableSeats"
                        value={trip.availableSeats}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Total Seats */}
                <div className="formGroup">
                    <label htmlFor="totalSeats">Total Seats</label>
                    <input
                        type="number"
                        id="totalSeats"
                        name="totalSeats"
                        value={trip.totalSeats}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="departmentId">Category</label>
                    <select
                        id="departmentId"
                        name="department"
                        value={trip.department}
                        onChange={handleChange}
                        required
                    >
                        <option value={0}>-- Select Category --</option>
                        {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                                {dept.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="formGroup">
                    <label htmlFor="categoryId">Category</label>
                    <select
                        id="categoryId"
                        name="category"
                        value={trip.category}
                        onChange={handleChange}
                        required
                    >
                        <option value={0}>-- Select Category --</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Image URL */}
                <div className="formGroup">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        value={trip.imageUrl}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Destination SELECT */}
                <div className="formGroup">
                    <label htmlFor="destinationId">Destination</label>
                    <select
                        id="destinationId"
                        name="destinationId"
                        value={trip.destinationId}
                        onChange={handleChange}
                        required
                    >
                        <option value={0}>-- Select Destination --</option>
                        {destinations.map((dest) => (
                            <option key={dest.id} value={dest.id}>
                                {dest.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Spacecraft SELECT */}
                <div className="formGroup">
                    <label htmlFor="spacecraftId">Spacecraft</label>
                    <select
                        id="spacecraftId"
                        name="spacecraftId"
                        value={trip.spacecraftId}
                        onChange={handleChange}
                        required
                    >
                        <option value={0}>-- Select Spacecraft --</option>
                        {spacecrafts.map((sc) => (
                            <option key={sc.id} value={sc.id}>
                                {sc.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="submitButton">
                    Create Trip
                </button>
            </form>
        </div>
    );
};

export default CreateTrip;