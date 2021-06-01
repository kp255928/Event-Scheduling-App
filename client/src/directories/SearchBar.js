import axios from 'axios';
import logincontrol from '../LoginControl'

const eventList = document.getElementById('eventList');
const searchBar = document.getElementById('searchBar');
let hpEvents =[];
console.log(searchBar);
const event = {
    username: logincontrol.getUsername(), //grab the user name from the front end (where is the username stored in the front end?)
    eventname: eventname, 
}
//get the event name from the database

function getEvents(){
    try {
        //successfully grab event
        returned_event = axios.get('http://localhost:9000/events/search', event);
      }
      catch(err) {
        //display mesage in front end that no event exists for the user
      }

}

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    console.log(searchString);

    const filteredEvents = hpEvents.filter( Event => {
        return(
            Event.name.toLowerCase().includes(searchString) || 
            Event.date.includes(searchString)
        );
    });
    displayEvents(filteredEvents);
});

const loadEvents = async() => {
    try {
        const res =await fetch('http://localhost:9000/events/search'); //add address of eventlist in ''
        hpEvents = await res.json();
        displayEvents(hpEvents);
        console.log(hpEvents);
    }catch (err){
        console.error(err);
    }
};

const displayEvents = (Events) => {
    const htmlString = Events //Just assume the eventlist is on htmlpage
        .map((Event) => {
            return `
            <li class="Event">
                <h2>${Event.name}</h2>
                <p>Date: ${Event.date}</p>
            </li>
        `;
        })
        .join('');
    eventList.innerHTML = htmlString;
};

loadEvents();