
// Import necessary dependencies
import React, { useState } from 'react';
import '../styles/Login.css'; // Import the CSS for styling
//import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    const { setUser } = useUser();

    const handleEmailChange = (e) => {
        const { name, value } = e.target;
        setEmail(value);
    };
    const handlePassChange = (e) => {
        const { name, value } = e.target;
        setPassword(value);
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("https://localhost:7234/api/Account/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to log in");
            }

            const userData = await response.json();

            setUser(userData);
            console.log(userData);
            setToken(userData.token); // Save the token for later use

            console.log("Login successful!");
            console.log(token);
        } catch (error: any) {
            setError(error.message || "Something went wrong");
        }

        navigate('/');
    };

    return (
        <div className="login-container">
            <h1 className="space-title">🚀 Welcome to Space Adventures Sign In</h1>

            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePassChange}
                    required
                />

                <button type="submit" className="submit-button-login">Sign In</button>
                <p>Not registered? <Link to="/register" className="reg-link">Create an account</Link></p>
            </form>
        </div>
    );
};

export default Login;