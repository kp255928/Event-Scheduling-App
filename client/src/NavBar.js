import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import logincontrol from "./LoginControl";
import {loadEvents, displayEvents } from "./directories/SearchBar"

const NavBar = () => {
    let eventList;
    let hpEvents=[];
    const event = {
    username: logincontrol.getUsername(), //logincontrol.getUsername(), //grab the user name from the front end (where is the username stored in the front end?)
    eventname: "" 
}
    // logincontrol.login();

    useEffect(() => {
        eventList = document.getElementById('eventList');
        loadEvents(event, eventList, hpEvents);
    },[])

    const handleChange =(e) => {
        const searchString = e.target.value.toLowerCase();
        console.log(searchString);
        const filteredEvents = hpEvents.filter( Event => {
            return(
                Event.eventname.toLowerCase().includes(searchString) || 
                Event.sdate.includes(searchString)
            );
        });
        displayEvents(filteredEvents, eventList);
    }

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
                <Link to="/search" className="link">Search event</Link>
            </div>
            <div id="searchWrapper">
                <input
                    type="text"
                    name="searchBar"
                    id="searchBar"
                    placeholder="search for an event"
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <ul id="eventList"></ul>
        </nav>
    );
} 

export default NavBar;
