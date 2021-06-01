import React, {useEffect, useState} from 'react';
import '../index.css';
import axios from "axios";
import logincontrol from "../LoginControl";
//var socket = io();

const Invite = () => {
    useEffect(() => {
        document.title = 'Invitation';
    });
    const [inviteUser, setInviteUser] = useState('');
    const [event, setEvent] = useState('');
    const curr_user = logincontrol.getUsername();

    invite_user(inviteUser, curr_user, event);

    // if else use 
    check_if_being_requested(curr_user);

    const handleAccept = (e) => {
        accept_event_Invitation(curr_user);
    };

    const handleReject = (e) => {
        deny_event_Invitation(curr_user);
    };





    return(
        <div className='invite'>
            <div className='useform'>
            <h2 className="message"></h2>
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
function invite_user(user_to_invite,username,event){
    const invite_information = {
        username: username,
        user_to_invite:user_to_invite,
        event: event,
    }
    try{
        axios.post('http://localhost:9000/users/search_user_to_invite/', invite_information);
        //display something like: request sent to user_to_invite successfully
    } catch(err) {
        //Cannot find the user in the database, display some errors in the front end (not in the console).
        console.log("error")
    }

}

/*****************************************************
 Make a button in the home page called "check event invitation", when clicked, will invoke the following 
 function, which checks if the current user is requsted by anyone to join an event.

 If Yes, Display the event, requester and two options: Accept or deny
    If user onclick "Accept", call the function "accept_event_Invitation"
    If the user onclick "deny" call the function "deny_event_Invitation"
 If No, Display "No invitation" to the user
*****************************************************/
function check_if_being_requested(current_user){
    const user = {
        username: current_user
    }
    let info;
    info = axios.get('http://localhost:9000/users/check_if_being_requested', user);
    if(info == null){
        //display the message "no invitation" to the user(in the front end).
        return false;
    } else {
        //Display the event, requester and two options: Accept or deny(in the front end)
        return true;
    }


}

function accept_event_Invitation(username){
    const user = {
        username: username,
    }
    let info;
    info = axios.post('http://localhost:9000/users/accept_event_Invitation', user);
    
    //if accepted, add the event to both people
    const current_user_event = {
        username: username,
        event: info.sender
    }
    axios.post('http://localhost:9000/events/add', current_user_event);
    const invited_user_event = {
        username: info.user,
        event: info.sender
    }
    axios.post('http://localhost:9000/events/add', invited_user_event);

}

function deny_event_Invitation(username){
    const user = {
        username: username,
    }
    axios.post('http://localhost:9000/users/deny_event_Invitation', user);


}