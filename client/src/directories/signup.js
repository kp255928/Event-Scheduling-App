import React, {useEffect} from 'react';
import './home.css';

const SignUp = () => {
    useEffect(() => {
        document.title = 'Sign Up';
    });

    return(
        <div>
            <h1 className="greet">This is the signup page</h1>
        </div>
    );
}
export default SignUp;