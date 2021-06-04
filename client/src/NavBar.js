import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import logincontrol from "./LoginControl";
import {loadEvents, displayEvents } from "./directories/SearchBar"
import ReactCircleModal from 'react-circle-modal'
import Modal from 'react-modal'
const NavBar = () => {
    //let eventList;
    const [filteredEvents, setFilteredEvents] = useState([]);
    const[modalIsOpen,setModalIsOpen] = useState(false)
    let hpEvents=[];
    const event = {
    username: logincontrol.getUsername(), //logincontrol.getUsername(), //grab the user name from the front end (where is the username stored in the front end?)
    eventname: "" 
}
    // logincontrol.login();

    useEffect(async() => {
        //let eventList = document.getElementById('eventList');
        await loadEvents(event, hpEvents);
    },[])
   
    const handleChange = async(e) => {
        hpEvents=[];
        await loadEvents(event, hpEvents);
        const searchString = e.target.value.toLowerCase();
        if(searchString){
        console.log(searchString);
        const filteredEvents = hpEvents.filter( Event => {
            return(
                Event.eventname.toLowerCase().includes(searchString) || 
                Event.sdate.includes(searchString)
            );
        });
        setFilteredEvents(filteredEvents)
        //displayEvents(filteredEvents, eventList);
        }
        else{
            setFilteredEvents([])
        }
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
            <button onClick={() => setModalIsOpen(true)}>Display Search Result</button>
            <Modal isOpen = {modalIsOpen} onRequestClose={()=>setModalIsOpen(false)}>
                <h2>Matched events</h2>
                <p> <ul id="eventList">
                {filteredEvents.map((event) =>(
                            <div className="event-preview" key={event.id}>
                                <h2>{ event.eventname }</h2>
                                <p>date: { event.sdate }</p>
                                <p>Time: { event.stime }</p>

                            </div>
                        ))}
            </ul></p>
                <button onClick={()=>setModalIsOpen(false)}>Closed</button>

            </Modal>
            
        </nav>
    );
} 

export default NavBar;
