import React, { useState, useEffect } from 'react';
import TripCard from './TripCard';
import '../styles/Catalogue.css';
import { useUser } from '../context/UserContext';


const Catalogue = () => {
    const [trips, setTrips] = useState([]);
    const [departments, setDepartments] = useState({});

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const { user } = useUser();

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await fetch('https://localhost:7234/api/Trip');
                const data = await response.json(); 
                setTrips(data); 
                console.log(data);

                const departmentDictionary = data.reduce((dict, trip) => {
                    if (!dict[trip.department]) {
                        dict[trip.department] = new Set();
                    }
                    dict[trip.department].add(trip.category);
                    return dict;
                }, {});

                Object.keys(departmentDictionary).forEach(key => {
                    departmentDictionary[key] = Array.from(departmentDictionary[key]);
                });

                console.log(departmentDictionary);
                setDepartments(departmentDictionary);


                console.log(departments);
            } catch (error) {
                console.error('Error fetching trips:', error);
            }
        };
        fetchTrips();
    }, []);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleDepartmentSelect = (department) => {
        setSelectedDepartment(department);
        setSelectedCategory(null); 
    };

    const filteredTrips = trips.filter((trip) => {
        if (selectedCategory) {
            return trip.category === selectedCategory;
        }
        if (selectedDepartment) {
            return trip.department === selectedDepartment;
        }
        return true;
    });

    return (
        <div className="catalogue-container">
                <div className="department-menu">
                    <h3>Select Department</h3>
                {Object.keys(departments).map((department) => (
                        <button
                            key={department}
                            onClick={() => handleDepartmentSelect(department)}
                            className={selectedDepartment === department ? 'selected' : ''}
                        >
                        {department}
                        </button>
                    ))}
                </div>

                {selectedDepartment && (
                    <div className="category-menu">
                        <h3>Select Category</h3>
                        {departments[selectedDepartment]?.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategorySelect(category)}
                                className={selectedCategory === category ? 'selected' : ''}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                )}

                {selectedCategory && (
                    <div className="selected-category">
                        <h4>Viewing Trips in: {selectedCategory}</h4>
                    </div>
                )}

            <div className="trip-cards">
                {filteredTrips.map((trip) => (
                    <TripCard key={trip.id} trip={trip} user={user} />
                ))}
            </div>
        </div>
    );
};

export default Catalogue;
