import React, {useEffect} from 'react';
import Calendar from 'react-calendar';
import '../index.css';

const Home = () => {
    useEffect(() => {
        document.title = 'Home';
    });
    return(
        <div classname="homeText">
            <h1 className="greet">Hello there! This is the Homepage</h1>
            <p>Click on the botton to redirect for now!</p>
            <Calendar></Calendar>
            
        </div>
    );
};

export default Home;