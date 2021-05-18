import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../index.css';

const Login = () => {
    useEffect(() => {
        document.title = 'Log In';
    });

    const [username, setName] = useState('');
    const [password, setPassword] = useState('');

    return(
        <div className="login">
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
                <button>Log In</button>
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