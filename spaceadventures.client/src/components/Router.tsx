import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './Menu';
import Home from './Home';
import Register from './RegisterComponent';
import Login from './Login';
import Catalogue from './Catalogue';
import TripDetails from './TripDetails';
import BookingWithStripe from './Booking';
import Profile from './Profile';
import CreateTrip from './CreateTrip';

const RouterComponent = () => {
    return (
        <Router>
            <Menu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalogue" element={<Catalogue />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/trips/:tripId" element={<TripDetails />} />
                <Route path="/booking" element={<BookingWithStripe />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/add-trip" element={<CreateTrip />} />



            </Routes>

        </Router>
    );
};

export default RouterComponent;
