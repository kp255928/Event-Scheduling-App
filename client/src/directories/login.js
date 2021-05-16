import React, {useEffect} from 'react';
import './home.css';

const LogIn = () => {
    useEffect(() => {
        document.title = 'Log In';
    });

    return(
        <div>
            <h1 className="greet">This is the Log in page</h1>
        </div>
    );
}

export default LogIn;