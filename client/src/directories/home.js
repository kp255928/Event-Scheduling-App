import React from 'react';
import './home.css';

// function home() {
//     return(
//         <div classname="home">
//             <h1>"This is homepage"</h1>
//         </div>
//     );
// }

const Home = () => {
    return(
        <div classname="homeText">
            <h1 className="greet">Hello there! This is the Homepage</h1>
            <p>Click on the botton to redirect for now!</p>
            
        </div>
    );
};

export default Home;