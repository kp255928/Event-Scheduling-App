import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import {Auth} from "aws-amplify";
import {useAppContext} from "../libs/contextLib";
import '../index.css';
import { useHistory } from "react-router-dom";
import {onError} from "../libs/errorLib";


export default function Login(){
    const [name, setName] = useState("");
    const [password, setPasssword] = useState("");
    const {userHasAuthenticated} = useAppContext();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    const Login = () => {
        useEffect(() => {
            document.title = 'Log In';
        });
    
        // return(
        //     <div>
        //         <h1 className="greet">This is the Log in page</h1>
        //     </div>
        // );
    }

    function validateForm(){
        return name.length > 0 && password.length > 0;
    }

    async function handleSubmit(event){
        event.preventDefault();

        setIsLoading(true);

         try{
             await Auth.signIn(name, password);
             userHasAuthenticated(true);
             history.push("/")
         } catch(e){
             onError(e);
             setIsLoading(false);
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
                <LoaderButton
                    block
                    size="lg"
                    type="submit"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Login
                </LoaderButton>
            </Form>
        </div>
    )
}

// const Login = () => {
//     return(
//         <h1 className="greet">This is login page</h1>
//     );
// }
// export default Login;