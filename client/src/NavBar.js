import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import logincontrol from "./LoginControl";

const NavBar = () => {
    // logincontrol.login();
    return(
        <nav className="navbar">
            <Link to="/" className="icon">Event Scheduler App</Link>       
            <div className="navlinks">
                {logincontrol.isLoggedIn() ? 
                    <Link to="/" className="link" onClick={logincontrol.logout}>Log out</Link>
                    :
                    <Link to="/login" className="link">Log in</Link>
                }
                {/* <Link to="/login" className="link">Log in</Link> */}
                {/* <Link to="/create" className="link">Create events</Link> */}
                <Link to="/invite" className="link">Invite friends</Link>
            </div>
            <div id="searchWrapper">
                <input
                    type="text"
                    name="searchBar"
                    id="searchBar"
                    placeholder="search for an event"
                />
            </div>
            <ul id="eventList"></ul>
        </nav>
    );
} 

export default NavBar;
