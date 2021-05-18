import React, {useEffect} from 'react';
import '../index.css';

const AddCalendar = () => {
    useEffect(() => {
        document.title = 'Add Event';
    });
    return(
        <div classname="homeText">
        <h1 className="greet">Add Calendar here!</h1>
    </div>
    );
}
export default AddCalendar;