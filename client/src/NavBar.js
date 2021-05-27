import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import logincontrol from "./LoginControl";

const NavBar = () => {
    // const isIn = (
    //     <Fragment>
    //         <Link to="/" className="link">Log out</Link>
    //     </Fragment>
    // );

    // const nIsIn = (
    //     <Fragment>
    //         <Link to="/login" className="link">Log in</Link>
    //     </Fragment>
    // );
    //     console.log(global.isLoggedIn);
        
    return(
        <nav className="navbar">
            <Link to="/" className="icon">Calendar App</Link>       
            <div className="navlinks">
                {/* {logincontrol.isLoggedIn() ? isIn : nIsIn } */}
                <Link to="/login" className="link">Log in</Link>
                {/* <Link to="/signup" className="link">Sign up</Link> */}
                <Link to="/create" className="link">Create events</Link>
                {/* <Link to="/invite" className="link">Invite friends</Link> */}
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
