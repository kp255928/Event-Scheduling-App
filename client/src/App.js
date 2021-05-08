import React from 'react';
//import logo from './logo.svg';
import './App.css';


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
    return (
        <div className="App">
            <header className="App-header">
            </header>
            <p>{this.state.apiResponse}</p>
        </div>
      
  );
}
}

export default App;
