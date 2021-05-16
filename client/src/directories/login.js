import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Auth} from "aws-amplify";
import './home.css';

export default function Login(){
    const [name, setName] = useState("");
    const [password, setPasssword] = useState("");

    const Login = () => {
        useEffect(() => {
            document.title = 'Log In';
        });
    
        return(
            <div>
                <h1 className="greet">This is the Log in page</h1>
            </div>
        );
    }

    function validateForm(){
        return name.length > 0 && password.length > 0;
    }

    async function handleSubmit(event){
        event.preventDefault();

        try{
            await Auth.signIn(name, password);
            alert("Logged in");
        } catch(e){
            alert(e.message);
        }
    }

    return(
        <div className = "LogIn">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="name">
                    <Form.label>Name</Form.label>
                    <Form.Control
                    autoFocus
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.label>Password</Form.label>
                    <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPasssword(e.target.value)}
                    />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
            </Form>
        </div>
    )
}