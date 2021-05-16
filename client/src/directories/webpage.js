import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Home from './home';
import LogIn from './login';
import SignUp from './signup';
import './webpage.css';

const WebPages = () => {
    return(
        <Router>
            <Route exact path="/" component= {Home} />
            <Route exact path="/login" component= {LogIn} />
            <Route exact path="/signup" component= {SignUp} />
            
            {/* more to add */}
            <Link to="/signup" className="redirect">Sign up</Link>
            <Link to="/login" className="redirect">Log in</Link>
            <Link to="/" className="redirect">Home</Link>


        </Router>
    );
}
export default WebPages;