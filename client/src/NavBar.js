import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const NavBar = () => {
    return(
        <nav className="navbar">
            <Link to="/" className="icon">アプリの名前を考えて</Link>
            <div className="navlinks">
                <Link to="/login" className="link">Log in</Link>
                <Link to="/signup" className="link">Sign up</Link>
                <Link to="/addEvent" className="link">Add Events</Link>
                <Link to="/invite" className="link">Invite friends</Link>
            </div>
        </nav>
    );
} 

export default NavBar;
