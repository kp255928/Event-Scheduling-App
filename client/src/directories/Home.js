import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Component } from 'react';
//import { update } from '../../../server/datamodel/user';
import '../index.css';
import logincontrol from "../LoginControl";

const Home = () => {
    useEffect(() => {
        document.title = 'Home';
    });
    //logincontrol.login();

    const [events, setEvents] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [userEvent, setUserEvent] = useState([]); //get user's event from backend
    const [isConflict,update_isConflict] = useState('');
    const [displayConflict,update_displayConflict] = useState('');
    //HOPEFULLY get sth like this below
    // const [userEvent, setUserEvent] = useState([
    //     {title: 'Git repository organization due', date:'May 31', discription:'Git repository organization due', id: 1},
    //     {title: 'Project source code due', date:'June 2', discription:'Project source code due', id: 2},
    //     {title: 'Project Final Report due', date:'June 4', discription:'Project Final Report due', id: 3},
    //     {title: 'End-of-quarter LA feedback survey due', date:'June 4', discription:'End-of-quarter LA feedback survey due', id: 4}

    // ]);
    // logincontrol.login();
    const handleSubmit = (e) => {
        //backend function
        //check conflict:
        //Date format is YYYY-MM-DD
        //Time format is HH:MM
        console.log(time)
        console.log(date)
        const event_object = {
            username: logincontrol.username,
            eventname: events,
            sdate:date,
            stime:time
        }
        read_conflict(event_object);
        e.preventDefault();
        

    }
    const handleB = (e) => {
        //backend function
        //check conflict:
        //Date format is YYYY-MM-DD
        //Time format is HH:MM
        display_events()
    }
    function display_events(){
        return Axios({
            method: "POST",
            data: {
                username:logincontrol.username
            },
            url : "http://localhost:9000/events/display_event_object",
            
        }).then((res) => {
            console.log(res.data)
            setUserEvent(res.data)
            return res.data;         
        });
    }
    function conflict_check(event_object){
        return Axios({
            method: "POST",
            data: event_object,
            withCredentials: true,
            url: "http://localhost:9000/events/checkconflict",
          });

    }
    function read_conflict(event_object){
        let returned = conflict_check(event_object);
        returned.then(function(result) {
            console.log(result.data.message)
            if(result.data.message == "Conflict detected. Please change your event date/time"){
                update_isConflict(result.data.message)
            }else{
                update_isConflict(" ")
                add_event2();
            }
         });
    }
    function add_event2(event_object){
        let returned = add_event(event_object);
        returned.then(function(result) {
            console.log("Your event is added to the scheduler!")
            update_isConflict("Your event is added to the scheduler!")
         });
    }
    function add_event(){
        const event_object = {
            username: logincontrol.username,
            eventname: events,
            date:date,
            time:time
        }
        return Axios({
            method: "POST",
            data: event_object,
            withCredentials: true,
            url: "http://localhost:9000/events/add",
          });

    }
    function update(isConflict){
        if(isConflict == "Conflict detected. Please change your event date/time"){
            update_displayConflict("Time Conflict detected. Please change your event date/time");
        }

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
                        {/*<h1>{ update(isConflict) }</h1>*/}
                        <h1>{ isConflict }</h1>
                    </form>
                    </div>
                    <button className="show-button" onClick={handleB}>Show your events</button>
                    {userEvent.length === 0?
                        <div className="message">
                            <h2>You have no upcoming event, check back again</h2>
                        </div>
                    :
                        <div className="display">
                        {userEvent.map((event) =>(
                            <div className="event-preview" key={event.id}>
                                <h2>{ event.eventname }</h2>
                                <p>date: { event.date }</p>
                                <p>Time: { event.time }</p>
                                
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