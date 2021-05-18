import React, {useEffect} from 'react';
import '../index.css';
import SearchField from "react-search-field";

// function home() {
//     return(
//         <div classname="home">
//             <h1>"This is homepage"</h1>
//         </div>
//     );
// }

const Home = () => {
    useEffect(() => {
        document.title = 'Home';
    });
    return(
        <div classname="homeText">
            <SearchField
                placeholder="Search..."
                searchText="yooooo!"
                // onChange={(e) => onChange}
                classNames="teat-class"
            />
            <h1 className="greet">Hello there! This is the Homepage</h1>
            <p>Click on the botton to redirect for now!</p>
            
        </div>
    );
};

export default Home;