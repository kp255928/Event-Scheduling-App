import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Component } from 'react';
import '../index.css';
import logincontrol from "../LoginControl";

const Home = () => {
    useEffect(() => {
        document.title = 'Home';
    });
    logincontrol.login();

    const [events, setEvents] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [userEvent, setUserEvent] = useState([]); //get user's event from backend

    //HOPEFULLY get sth like this below
    // const [userEvent, setUserEvent] = useState([
    //     {title: 'Git repository organization due', date:'May 31', discription:'Git repository organization due', id: 1},
    //     {title: 'Project source code due', date:'June 2', discription:'Project source code due', id: 2},
    //     {title: 'Project Final Report due', date:'June 4', discription:'Project Final Report due', id: 3},
    //     {title: 'End-of-quarter LA feedback survey due', date:'June 4', discription:'End-of-quarter LA feedback survey due', id: 4}

    // ]);

    const handleSubmit = (e) => {
        //backend function
    }

    return(
        // <div className="home">
        //     <h2 className="home-message">{message}</h2>
        //     {/* <h2 className="home-message">and here are some upcoming events</h2> */}
        //     {events.map((event) =>(
        //         <div className="event-preview" key={event.id}>
        //             <h2>{ event.title }</h2>
        //             <p>date: { event.date }</p>
        //         </div>
        //     ))}
        // </div>
        <div className="home">
            {logincontrol.isLoggedIn()?
                <div>
                    <div className="message">
                        <h2>Welcome {logincontrol.getUsername()}</h2>
                    </div>
                    <div className="create">
                    <form>
                        <label>Create Event</label>
                        <input 
                            type="text"
                            value = {events}
                            onChange={ (e) => setEvents(e.target.value)}
                            placeholder="Enter new event" 
                        />
                        <label>Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <label>Time</label>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                        <button onClick={handleSubmit}>Add Event</button>
                    </form>
                    </div>
                    {userEvent.length === 0?
                        <div className="message">
                            <h2>You have no upcoming event</h2>
                        </div>
                    :
                        <div className="display">
                        {userEvent.map((event) =>(
                            <div className="event-preview" key={event.id}>
                                <h2>{ event.title }</h2>
                                <p>date: { event.date }</p>
                            </div>
                        ))}
                        </div>
                    }
                </div>
            :
                <div className="message">
                    <h2>Please login first</h2>
                </div>
            }
        </div>
    );
};

export default Home;