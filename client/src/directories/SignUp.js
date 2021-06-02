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

<<<<<<< HEAD
 
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

=======
    /*****************************************************
     * MOVED TO LOGINCONTROL.JS FILE
     *****************************************************/
    // //put the newly register user password and username into the database.
    // //maybe need to display a page that notify that user the account creation is a success/failure. And redirect them to the calender.
    // function RegisterUser(){
    //     console.log("1");
    //     axios.post('http://localhost:9000/users/add',user)
    //     .then(res => console.log(res.data));
    //     //need to store this info into the passport
    // }
    const history = useHistory();

    const handleButton = (e) => {
        logincontrol.Register(user);
        e.preventDefault();
        // history.push('/');
    }
    
>>>>>>> 5399057d2c77bcff14304509b97a5126370a7e53
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
<<<<<<< HEAD
                <h1>{signUpStatus} </h1>
=======
>>>>>>> 5399057d2c77bcff14304509b97a5126370a7e53
                
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