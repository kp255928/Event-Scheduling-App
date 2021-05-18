import React, {useEffect, useState} from 'react';
import '../index.css';

const AddCalendar = () => {
    useEffect(() => {
        document.title = 'Create Event';
    });

    const [event, setEvent] = useState('');

    return(
        <div classname="createevent">
            <div classname="eventform">
                <label>Create an event</label>
                <form>
                    <label>Month</label>
                    <select>
                        {/* <option defaultValue="1" disabled>Select one</option> */}
                        <option value="January">January</option>
                        <option value="Febuary">Febuary</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                    </select>
                </form>
            </div>
        </div>
    );
}
export default AddCalendar;