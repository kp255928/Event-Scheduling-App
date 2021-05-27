import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Component } from 'react';
import '../index.css';
import logincontrol from "../LoginControl";

const Home = () => {
    useEffect(() => {
        document.title = 'Home';
    });

    const [events, setEvents] = useState([
        {title: 'Git repository organization due', date:'May 31', discription:'Git repository organization due', id: 1},
        {title: 'Project source code due', date:'June 2', discription:'Project source code due', id: 2},
        {title: 'Project Final Report due', date:'June 4', discription:'Project Final Report due', id: 3},
        {title: 'End-of-quarter LA feedback survey due', date:'June 4', discription:'End-of-quarter LA feedback survey due', id: 4}

    ]);

    let message;
    if (! logincontrol.isLoggedIn()) {
        message = "Log in please";
    } else {
        message = "Hello guys! This is the new view of our calendar home and here are some upcoming events";
    }

    function componentDidMount() {
        const config = {
            headers: {
                Authorization: '' + localStorage.getItem('token')
            }
        };
        axios.get('user', config).then(
            res => {
                console.log(res)
            },
            err => {
                console.log(err)
            }
        )
    }

    return(
    
        <div className="home">
            <h2 className="home-message">{message}</h2>
            {/* <h2 className="home-message">and here are some upcoming events</h2> */}
            {events.map((event) =>(
                <div className="event-preview" key={event.id}>
                    <h2>{ event.title }</h2>
                    <p>date: { event.date }</p>
                </div>
            ))}
        </div>
    );
};

export default Home;