import React, {useEffect} from 'react';
import '../index.css';
import axios from "axios";

//var socket = io();


const Invite = () => {
    useEffect(() => {
        document.title = 'Add Friend';
    });
    return(
        <div>
            <h1 className="greet">Share with people</h1>   

            <div className="bottons">
                <h2 className="">Copy Link</h2>
                <button className="finishBotton">Done</button> 
            </div>
        </div>
    );
}

export default Invite;

/*****************************************************
 * Create some kind of searchbox such that when the user creates an event, and they clicked on the button "Invite user to event"
 * Next, when they typed the user they wanted to invite, and they clicked "ok", call the following function:

*NEED TO grab the following from the front end and pass it into the following function:
1. the user that the current user is trying to invite "user_to_invite"
2. The current user that is doing the operation: "username"
3. The event that the user is trying to add with another user "event"
*****************************************************/
function invite(user_to_invite,username,event){
    const invite_information = {
        username: username,
        user_to_invite:user_to_invite,
    }
    axios.post('http://localhost:9000/users/search_user_to_invite', invite_information);
    //searach data base for name
    //if found, store the user
    //request/respond
    //make event with user name 1 and 2
    //store in database

}