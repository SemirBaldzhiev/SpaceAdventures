import React, { useState, useEffect } from 'react';
import '../styles/Profile.css';
import { useUser } from '../context/UserContext';

const Profile = () => {
    const [selectedOption, setSelectedOption] = useState('userInfo');
    const [userInfo, setUserInfo] = useState(null);
    const [userBookings, setUserBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useUser();
    const userId = user.user.id;

    console.log(userId);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userInfoResponse = await fetch(`https://localhost:7234/api/Account/get-user-info/${userId}`);
                if (!userInfoResponse.ok) throw new Error('Failed to fetch user info');
                const userInfoData = await userInfoResponse.json();
                setUserInfo(userInfoData);

                const bookingsResponse = await fetch(`https://localhost:7234/api/Booking/user-bookings/${userId}`);
                if (!bookingsResponse.ok) throw new Error('Failed to fetch bookings');
                const bookingsData = await bookingsResponse.json();
                setUserBookings(bookingsData);

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    const renderContent = () => {
        if (loading) return <p>Loading...</p>;
        //if (error) return <p style={{ color: 'red' }}>{error}</p>;

        if (selectedOption === 'userInfo' && userInfo) {
            return (
                <div className="user-info">
                    <h2>User Information</h2>
                    <p>First Name: {userInfo.firstName}</p>
                    <p>Last Name: {userInfo.lastName}</p>
                    <p>Email: {userInfo.email}</p>
                </div>
            );
        } else if (selectedOption === 'myBookings' && userBookings.length > 0) {
            return (
                <div className="my-bookings">
                    <h2>My Bookings</h2>
                    <ul>
                        {userBookings.map((booking) => (
                            <li key={booking.id}>
                                <div>
                                    <li className="trip-name">{booking.tripName}</li>
                                    <li className="trip-details">
                                        {booking.totalAmount} BGN
                                        <br />
                                        {new Date(booking.bookingDate).toLocaleDateString()}
                                    </li>
                                    <li>
                                        {new Date(booking.launchDate).toLocaleDateString()} -{' '}
                                        {new Date(booking.returnDate).toLocaleDateString()}</li>
                                    <li>{booking.durationToStay} days</li>
                                    <li>{booking.paymentStatus}</li>

                                </div>
                            </li>

                        ))}
                    </ul>
                </div>
            );
        } else if (selectedOption === 'myBookings') {
            return <p>No bookings found.</p>;
        }
        return null;
    };

    return (
        <div className="profile-page">
            <aside className="profile-menu">
                <ul>
                    <li
                        className={selectedOption === 'userInfo' ? 'active' : ''}
                        onClick={() => setSelectedOption('userInfo')}
                    >
                        View User Info
                    </li>
                    <li
                        className={selectedOption === 'myBookings' ? 'active' : ''}
                        onClick={() => setSelectedOption('myBookings')}
                    >
                        My Bookings
                    </li>
                </ul>
            </aside>
            <main className="profile-content">{renderContent()}</main>
        </div>
    );
};

export default Profile;
