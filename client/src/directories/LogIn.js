import React, {setState, useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import '../index.css';
import logincontrol from "../LoginControl";
import Axios from "axios";
import '../App.js'
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
        let returned = checkRegister(user);
        returned.then(function(result) {
            setlogInStatus(result.data.message);
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
      
     function checkRegister(user) {
        const user_object = {
            username: user[1],
            password: user[0]
        }
        console.log(user_object)
        var ok;
            return Axios({
                method: "POST",
                data: user_object,
                withCredentials: true,
                url: "http://localhost:9000/users/login",
              }); //.then((res) => {
               // //this.username = res.username;
              //  return res.data.message;
              //});
    }

    const handleButton = (e) => {
        read(user);
        getUser()
        e.preventDefault();
        
        console.log(logInStatus + "ok")
        //logincontrol.username = data.username; //set login control username
        // history.push('/');
     }
     function update(logInStatus){
         console.log(logInStatus)
         if(logInStatus === "Successfully Authenticated"){
            console.log(data.username)
            logincontrol.username = data.username;
            console.log(logincontrol.username)
            logincontrol.login();
            // history.push('/');
         }
     }
    return(
        
        <div className="login">
             {/* <div>
        <h1>Get User after logged in</h1>
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
                <h1>{update(logInStatus)} </h1>
            </form>
            </div>
            <div className="accountaction">
                <label className="accountmessage">Don't have an acco unt?</label>
                <div className="accountlinks">
                    <Link to="/signup" className="link">Sign up</Link>
                </div>
                
            </div>
           
        </div>
    );
}
export default Login;