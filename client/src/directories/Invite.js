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
export default Invite;