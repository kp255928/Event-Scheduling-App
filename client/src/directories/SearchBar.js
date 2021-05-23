import axios from 'axios';
const eventList = document.getElementById('eventList');
const searchBar = document.getElementById('searchBar');
let hpEvents =[];
console.log(searchBar);

//get the event name from the database
/*
function getEvents(){
    axios.get('http://localhost:9000/events/search', eventName);
}
*/
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
        const res =await fetch(''); //add address of eventlist in ''
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