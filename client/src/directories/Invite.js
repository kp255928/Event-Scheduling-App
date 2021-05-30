import React, {useEffect} from 'react';
import '../index.css';

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
//clicked invite
//make a form, type who to invite
export default Invite;

//call when clicked
function invite(name,event_name){
    //searach data base for name
    //if found, store the user
    //request/respond
    //make event with user name 1 and 2
    //store in database

}