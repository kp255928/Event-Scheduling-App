import axios from 'axios';
const eventList = document.getElementById('eventList');
const searchBar = document.getElementById('searchBar');
let hpEvents =[];
console.log(searchBar);
const event = {
     //need to check if the event belong to the current searching user first
    username: username, //grab the user name from the front end
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
        const res =await fetch('http://localhost:3000'); //add address of eventlist in ''
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