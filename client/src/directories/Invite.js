import React, { useEffect, useState, Fragment } from 'react';
import '../index.css';
import axios from "axios";
import logincontrol from "../LoginControl";
import { useHistory} from "react-router-dom";
//var socket = io();

const Invite = () => {
    useEffect(() => {
        document.title = 'Invitation';
    });
    const [inviteUser, setInviteUser] = useState('');
    const [event, setEvent] = useState('');
    const [requestEvent, setRequestEvent] = useState('');
    const [invitestat, setinvitestat] = useState('');
    const [is_false, set_is_false] = useState('');
    const [is_ok, set_ok] = useState('');
    const [requestString, setRS] = useState('');
    const curr_user = logincontrol.getUsername();
    console.log(curr_user);
    const history = useHistory();

    // temp here
    // logincontrol.login()

    const handleAccept = (e) => {
        accept_event_Invitation(curr_user);
        e.preventDefault();
        setRS(true);
    };

    const handleReject = (e) => {
        deny_event_Invitation(curr_user);
        e.preventDefault();
        setRS(true);
    };

    const handleButton = (e) => {
        if (inviteUser !== '' && event !== '') {
            e.preventDefault();
            console.log(curr_user + "noes")
            display_event_by_user(curr_user,event)

            if(is_ok == true){
                invite_user(inviteUser, curr_user, event);
                setinvitestat("Invitation successful");
            }
            
            //history.push('/');
        }
    }
    function check_if_being_requested(current_user){
        const usr = {
            "username": current_user
        }
        let returned = check_request(usr);
        returned.then(function(result) {
            if(result.event!=null){
                console.log(result.event)
                console.log(result.sender)
                set_is_false(true);
                setRequestEvent(result.event);
            }else{
                set_is_false(false);
            }
    
         });
    
        
        return is_false;
        // return true;
    
    }
    function display_event_by_user(curr_user,event){
        let returned = check(curr_user);
            returned.then(function(result) {
                var n = result.includes(event);
                console.log(n)
                if(n){
                    set_ok(true);
                }
    
             });
    }
    function get_request_received_from(curr_user){
        const obj = {
            username:curr_user
        }
        return axios({
            method: "POST",
            data: obj,
            url : "http://localhost:9000/users/receivedfrom",
            
        }).then((res) => {
            return res.data; 

        });
    }
    function accept_event_Invitation(curr_user){
        let returned1 = get_request_received_from(curr_user);
        returned1.then(function(result) {
            console.log(result);
            const invited_user_event = {
                username: result,
                eventname: requestEvent
            }
            let returned = checking(invited_user_event);
            returned.then(function(result) {
            console.log(result)
            const user_event = {
                username: curr_user,
                eventname: result[0].eventname,
                date:result[0].date,
                time:result[0].time
            }

            console.log(user_event)
            if((user_event.username != null) && (user_event.eventname != null) &&(user_event.date != null) &&(user_event.time != null)){
                axios.post('http://localhost:9000/events/add', user_event);
            }
         });

         });

        
        //axios.post('http://localhost:9000/events/add', invited_user_event);
    
    }
    function checking(user){
        return axios({
            method: "POST",
            data: user,
            url : "http://localhost:9000/events/display_event_object_by_username",
            
        }).then((res) => {
            return res.data;         
        });
    }
    function update(invitestat){
        if(invitestat == "There is no such event existed"){
            setinvitestat("There is no such event existed");
        }
    
    }
    return(
        <div className='invite'>
            { logincontrol.isLoggedIn()?
                <div>
                    <form>
                        <label className='message'>Invite friend to join the event</label>
                        <input
                            type="text"
                            value={ inviteUser }
                            onChange={ (e) => setInviteUser(e.target.value) }
                            placeholder="Enter your friend's username"
                        />
                        <label className='message'>Choose an event(that already existed) to invite</label>
                        {/* could use map here to do options in created event */}
                        <input
                            type="text"
                            value={ event }
                            onChange={ (e) => setEvent(e.target.value) }
                            placeholder="Enter event's name"
                        />
                        <button onClick={handleButton}>Invite now</button>
                    </form>
                    
                    <h1>{invitestat} </h1>
                    <h1>{update(invitestat)} </h1>
                    <div className='checkrequest'>
                        {check_if_being_requested(curr_user) && !requestString?
                            <div className='display'>
                                <h2 className='message'>You have the following Invitation!</h2>
                                <form>
                                    <label className='invitation'>You have been invited to join {requestEvent}</label>
                                    <button className='buttons' onClick={handleAccept}>Accept</button>
                                    <button className='rejectbuttons' onClick={handleReject}>Decline</button>
                                </form>
                            </div>
                        :
                            <div className='display'>
                                <h2 className='message'>You have no invation! Check back later!</h2>
                            </div>
                        }
                    </div>
                </div>
            :
                <div className='notloggedin'>
                    <h2 className="message">Please login first</h2>
                </div>
            }
        </div>
    );
}


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


async function check(current_user){
    console.log(current_user)
    return axios({
        method: "POST",
        data: {
            username:current_user
        },
        url : "http://localhost:9000/events/display_event",
        
    }).then((res) => {
        return res.data;         
    });
  
    
}

/*****************************************************
 Make a button in the home page called "check event invitation", when clicked, will invoke the following 
 function, which checks if the current user is requsted by anyone to join an event.
 If Yes, Display the event, requester and two options: Accept or deny
    If user onclick "Accept", call the function "accept_event_Invitation"
    If the user onclick "deny" call the function "deny_event_Invitation"
 If No, Display "No invitation" to the user

*****************************************************/
function check_request(usr){
    console.log(usr)
    return axios({
        method: "POST",
        data: usr,
        url: "http://localhost:9000/users/check_if_being_requested",
      }).then((res) => {
          return res.data;         
      });
    


}




function deny_event_Invitation(username){
    const user = {
        username: username,
    }
    axios.post('http://localhost:9000/users/deny_event_Invitation', user);


}

export default Invite;

