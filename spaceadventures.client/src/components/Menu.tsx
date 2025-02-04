import React from 'react';
import '../styles/Menu.css';
import { Link } from 'react-router-dom';  
import { useUser } from '../context/UserContext';


const Menu = () => {
    const { user } = useUser();

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <a href="/" className="navbar-logo">
                    Space Adventures

                </a>
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <Link to="/" className="navbar-link">Home</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/catalogue" className="navbar-link">Catalogue</Link>
                    </li>
                    {user ? (
                        <li className="navbar-item">
                            <Link to="/profile" className="navbar-link">Profile</Link>
                        </li>

                    ) : (
                    <li className="navbar-item">
                        <Link to="/login" className="navbar-link">Sign In</Link>
                    </li>
                    )}
                    {user && user.compayName != '' ? (<li className="navbar-item">
                        <Link to="/add-trip" className="navbar-link">Add Trip</Link>
                    </li>) : (null) }
                    {user ? (<li className="navbar-item">
                        <Link to="/logout" className="navbar-link" onClick={handleLogout}>Logout</Link>
                    </li>) : (<li className="navbar-item">
                        <Link to="/register" className="navbar-link">Register</Link>
                    </li>)}

                    
                   
                </ul>
            </div>
        </nav>
    );
};

export default Menu;
