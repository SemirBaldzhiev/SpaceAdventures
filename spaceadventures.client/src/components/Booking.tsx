import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../styles/Booking.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Booking = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [paymentError, setPaymentError] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [numberOfSeats, setNumberOfSeats] = useState(1);
    const { user } = useUser();
    const location = useLocation();
    const { trip } = location.state;
    const totalPrice = trip.pricePerSeat * numberOfSeats;

    const handleConfirm = async () => {
        if (!stripe || !elements) {
            setPaymentError('Stripe has not loaded yet.');
            return;
        }

        if (trip.availableSeats == 0) {
            alert('No available seats for this trip!');
            navigate('/catalogue');
        }

        const cardElement = elements.getElement(CardElement);

        console.log(totalPrice);

        const response = await fetch('https://localhost:7234/api/Payment/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: totalPrice }),
        });

        console.log(response);

        const { clientSecret } = await response.json();

        console.log(clientSecret);

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: user.user.firstName,
                    email: user.user.email,
                },
            },
        });

        console.log(result);

        if (result.error) {
            setPaymentError(result.error.message);
        } else if (result.paymentIntent.status === 'succeeded') {
            console.log("here");
            setPaymentSuccess(true);
        }


        if (result.paymentIntent.status === 'succeeded') {
            const response = await fetch('https://localhost:7234/api/Booking/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.user.id,
                    tripId: trip.id,
                    totalAmount: totalPrice,
                    paymentStatus: "Paid",
                    numberOfSeats: numberOfSeats
                }),
            });

            if (response.ok) {
                navigate('/catalogue');
            }

        }
    };

    return (
        <div className="booking-container">
            <h2>Booking Confirmation</h2>

            <div className="trip-info">
                <h3>Trip Details</h3>
                <p><strong>Destination:</strong> {trip.destination.name}</p>
                <p><strong>Launch Date:</strong> {new Date(trip.launchDate).toLocaleDateString()}</p>
                <p><strong>Return Date:</strong> {new Date(trip.returnDate).toLocaleDateString()}</p>
                <p><strong>Available Seats:</strong> {trip.availableSeats}</p>
                <p><strong>Price Per Seat:</strong> {trip.pricePerSeat} BGN</p>
            </div>

            <div className="user-info">
                <h3>Your Details</h3>
                <p><strong>Name:</strong> {user.user.firstName} {user.user.lastName}</p>
                <p><strong>Email:</strong> {user.user.email}</p>
            </div>

            <div>
                <h3>Select count of Seats</h3>
                <input
                    type="number"
                    min="1"
                    max={trip.availableSeats}
                    value={numberOfSeats}
                    onChange={(e) => setNumberOfSeats(parseInt(e.target.value, 10))}
                />
                <p><strong>Total Price: </strong> {totalPrice} BGN</p>
            </div>

            <div className="payment-section">
                <h3>Payment Method</h3>
                <CardElement className="StripeElement" />
                {paymentError && <p className="error">{paymentError}</p>}
                {paymentSuccess && <p className="success">Payment Successful!</p>}
            </div>

            {/* Confirm Booking Button */}
            <div className="confirm-booking">
                <button onClick={handleConfirm} disabled={!stripe} className="confirm-button">
                    Confirm Booking and Pay
                </button>
            </div>
        </div>
    );
};

const BookingWithStripe = () => (
    <Elements stripe={stripePromise}>
        <Booking />
    </Elements>
);

export default BookingWithStripe;
