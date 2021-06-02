import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import '../index.css';
import logincontrol from "../LoginControl";
import Axios from "axios";

const Login = () => {
    useEffect(() => {
        document.title = 'Log In';
    });
    const [data, setData] = useState(null);
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');
    const [logInStatus, setlogInStatus] = useState('');
    // const [isLoggedIn, setLoggedIn] = useState(false);
    const user = [password,username]
    
    function read(user){
        let returned = logincontrol.checkRegister(user);
        returned.then(function(result) {
            setlogInStatus(result);
         });
    }

    const history = useHistory();

    const getUser = () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:9000/users/user",
        }).then((res) => {
            setData(res.data);
        });
      };

    const handleButton = (e) => {
        read(user);
        getUser()
        e.preventDefault();
        if(logInStatus == "Successfully Authenticated"){
            logincontrol.setUsername(data.username);
        }
        //logincontrol.username = data.username; //set login control username
        // history.push('/');
     }
    return(
        
        <div className="login">
             {/* <div>
        <h1>Get User after logged in (remember to Remove this after)</h1>
        <button onClick={getUser}>Submit</button>
        {data ? <h1>Welcome Back {data.username}</h1> : null}
      </div> */}
            <div className="userform">
            <h2 className="pagename">Log in</h2>
            <form>
                {/* <label>Username:</label> */}
                <input
                    type="text"
                    required
                    value={ username }
                    onChange={ (e) => setName(e.target.value) }
                    placeholder="Username"
                />
                {/* <label>Password:</label> */}
                <input
                    type="password"
                    required
                    value={ password }
                    onChange={ (e) => setPassword(e.target.value) }
                    placeholder="Password"
                />
                <button onClick={handleButton}>Log In</button>
                <h1>{logInStatus} </h1>
            </form>
            </div>
            <div className="accountaction">
                <label className="accountmessage">Don't have an account?</label>
                <div className="accountlinks">
                    <Link to="/signup" className="link">Sign up</Link>
                </div>
                
            </div>
           
        </div>
    );
}
export default Login;