import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Home from './home';
import Login from './login';
import SignUp from './signup';
import AddCalendar from './addCal';
import Invite from './invite';
import './webpage.css';

const WebPages = () => {
    return(
        <Router>
            <Route exact path="/" component= {Home} />
            <Route exact path="/login" component= {Login} />
            <Route exact path="/signup" component= {SignUp} />
            <Route exact path="/addcalendar" component= {AddCalendar} />
            <Route exact path="/invite" component= {Invite} />

            
            {/* more to add */}
            <Link to="/signup" className="redirect">Sign up</Link>
            <Link to="/login" className="redirect">Log in</Link>
            <Link to="/" className="redirect">Home</Link>
            <Link to="/addcalendar" className="redirect">Add calendar</Link>
            <Link to="/invite" className="redirect">Invite</Link>


        </Router>
    );
}
export default WebPages;