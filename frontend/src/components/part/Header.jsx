import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ isLoggedIn, onLogout }) {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login'); // Navigate to the login page
    };

    const handleLogoutClick = () => {
        onLogout(); // Trigger the onLogout function passed as a prop
    };

    return (
        <div>
            <h1>Header</h1>
            <div>
                {isLoggedIn ? (
                    <button className='logout' onClick={handleLogoutClick}>Logout</button>
                ) : (
                    <button className='login' onClick={handleLoginClick}>Login/Signup</button>
                )}
            </div>
        </div>
    );
}

export default Header;


/*import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLoginClick = () => {
        navigate('/login'); 
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        navigate('/login'); 
    };

    return (
        <div>
            <h1>Header</h1>
            <div>
                {isLoggedIn ? (
                    <button className='logout' onClick={handleLogoutClick}>Logout</button>
                ) : (
                    <button className='login' onClick={handleLoginClick}>Login/Signup</button>
                )}
            </div>
        </div>
    );
}

export default Header;*/

