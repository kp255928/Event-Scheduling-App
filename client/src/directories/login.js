import React, {useEffect} from 'react';
import Form from "react-bootstrap/From";
import Button from "react-bootstrap/Button";
import './home.css';

export default function login(){
    const [name,setName] = useState("");
    const [password, setPasssword] = useState("");

    function validateForm(){
        return name.ength > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return(
        <div className = "Login">
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
        </div>
    )
}
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