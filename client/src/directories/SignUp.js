import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import logincontrol from '../LoginControl';
import { useHistory } from 'react-router-dom';
// import axios from 'axios';





const SignUp = () => {
    useEffect(() => {
        document.title = 'Sign Up';
    });
    
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');
    const [signUpStatus, setSignUpStatus] = useState('');
    const user = {
        username: username,
        password: password,
    }

 
    function read(user){
        let returned = logincontrol.RegisterUser(user);
        returned.then(function(result) {
            setSignUpStatus(result);
         });

    }
    const history = useHistory();

    const handleButton = (e) => {
        read(user);
        e.preventDefault();
        // history.push('/');
    }

    return(
        
        <div className="signup">
            <div className="userform">
            <h2 className="pagename">Create account</h2>
            <form>
                {/* <label>Username:</label> */}
                <input
                    type="text"
                    required
                    value={ username }
                    onChange={ (e) => setName(e.target.value) }
                    placeholder="Create Username"
                />
                {/* <label>Password:</label> */}
                <input
                    type="text"
                    required
                    value={ password }
                    onChange={ (e) => setPassword(e.target.value) }
                    placeholder="Create Password"
                />
                <button onClick={handleButton}> Sign up </button>
                <h1>{signUpStatus} </h1>
                
            </form>
            </div>
            <div className="accountaction">
                <label className="accountmessage">Already have an account?</label>
                <div className="accountlinks">
                    <Link to="/login" className="link">Log in</Link>

                </div>
            </div>
        </div>
    );
    
}


export default SignUp;