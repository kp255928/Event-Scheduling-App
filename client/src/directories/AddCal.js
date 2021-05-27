import React, {useEffect, useState} from 'react';
import '../index.css';

const AddCalendar = () => {
    useEffect(() => {
        document.title = 'Create Event';
    });

    const [event, setEvent] = useState('');

    return(
        <div className="createevent">
            <div className="eventform">
                <label>Create an event</label>
                <form>
                    <label>Month</label>
                    <select required>
                        <option defaultValue="0" selected disabled>Select one</option>
                        <option value="1">January</option>
                        <option value="2">Febuary</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </form>
            </div>
        </div>
    );
}
export default AddCalendar;