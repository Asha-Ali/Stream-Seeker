import React, { useState, useEffect } from "react";
import "../Navbar/Navbar.css"
import logo from '../../images/whitelogo.png'

const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useState(false)
    const userId = window.localStorage.getItem('userId')

    useEffect(() => {
        if (userId) {
            setLoggedInUser(true);
        }
    }, []);

    const handleLogout = () => {
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("userId")
    }

    return (

        <nav className="navbar">
        { !loggedInUser && (
        <>
            <div className="brand">
            <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
            </div>
            </div>
            <ul className="links">
                <li><a href="/homepage">Home</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/signup">Signup</a></li>
            </ul>
        </>
        )}
        {loggedInUser && (
            <>
            <div className="brand">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
            </div>
            <ul className="links">
                <li><a href="/homepage">Home</a></li>
                <li><a href={"/users/" + userId}>Your Profile</a></li>
                <li><a href={"/watchLater/" + userId}>Watch Later</a></li>
                <li><a href='/login' onClick={handleLogout}>Logout</a></li>
            </ul>
            </>
        )}
        </nav>
    );
};
export default Navbar;
