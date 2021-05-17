import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import NavBar from './NavBar';
import AddCalendar from './directories/AddCal';
import Home from './directories/Home';
import Invite from './directories/Invite';
import Login from './directories/LogIn';
import SignUp from './directories/SignUp';
import {AppContext} from './libs/contextLib';
import {Auth} from "aws-amplify";
import {onError} from "./libs/errorLib";
import Nav from "react-bootstrap/Nav"
import {LinkContainer} from "react-router-bootstrap"

function APP(){
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const history = useHistory();

  useEffect(() => {
    onLoad();
  },[]);

  async function onLoad(){
    try{
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }
    setIsAuthenticating(false);
  }

  async function handleLogout(){
    await Auth.signOut();

    userHasAuthenticated(false);
    history.push("/login");
  }
  return(
    !isAuthenticating && (
      <div className="App container py-3">
        <NavBar collapseOnSelect bg="light" expand="md" className="mb-3">
          <LinkContainer to="/">
            <NavBar.Brand className="font-weight-bold text-muted">
              Scratch
            </NavBar.Brand>
          </LinkContainer>
          <NavBar.Toggle />
          <NavBar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              {isAuthenticated ? (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              ) : (
                <>
                <LinkContainer to="/signup">
                  <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                </>
              )}
            </Nav>
          </NavBar.Collapse>
        </NavBar>
        <AppContext.Provider value={{isAuthenticated,userHasAuthenticated}}>
          <Route />
        </AppContext.Provider>
      </div>
    )
  );
}

class App extends React.Component {//newly created function
    constructor(props) {
        super(props);
        this.state = {apiResponse:""};
    }
    callAPI() {
        fetch("http://localhost:9000") //fetch from backend
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res })); //get the response from page
    }

    componentWillMount() {
        this.callAPI();
    }


  render(){
    return(
      <Router>
        <div className="App">
          <NavBar />
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/addEvent">
                <AddCalendar />
              </Route>
              <Route exact path="/invite">
                <Invite />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
