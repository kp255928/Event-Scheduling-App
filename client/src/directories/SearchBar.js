import axios from 'axios';
import logincontrol from '../LoginControl'

//const eventList = document.getElementById('eventList');
// const searchBar = document.getElementById('searchBar');
// let hpEvents =[];
// //console.log(searchBar);
// const event = {
//     username: "hersh", //logincontrol.getUsername(), //grab the user name from the front end (where is the username stored in the front end?)
//     eventname: "", 
// }
//get the event name from the database

// export function getEvents(){
//     try {
//         //successfully grab event
//         //returned_event = axios.get('http://localhost:9000/events/search', event);
//       }
//       catch(err) {
//         //display mesage in front end that no event exists for the user
//       }

// }
// export function searchBarFunc(){
//     searchBar.addEventListener('keyup', e => {
//     const searchString = e.target.value.toLowerCase();
//     console.log(searchString);

//     const filteredEvents = hpEvents.filter( Event => {
//         return(
//             Event.name.toLowerCase().includes(searchString) || 
//             Event.date.includes(searchString)
//         );
//     });
//     displayEvents(filteredEvents);
//     });
// }

export const loadEvents = async(event, eventList, hpEvents) => {
    try {
        // const res = await fetch('http://localhost:9000/events/search',{
        //     method:"POST",
        //     data: JSON.stringify({
        //         username: "hersh", //logincontrol.getUsername(), //grab the user name from the front end (where is the username stored in the front end?)
        //         eventname: "loll", 
        //     })
        // }) //add address of eventlist in ''
        
        await axios.post('http://localhost:9000/events/search', {
            username: event.username, //logincontrol.getUsername(), //grab the user name from the front end (where is the username stored in the front end?)
            eventname: event.eventname, 
          })
          .then(function (response) {
            //   var i;
            //   for( i = 0; i < response.data.length; i++){
            //     hpEvents.push(response.data[i]);
            //   }
            console.log(response)
            response?.data.map((data) => {
                hpEvents.push(data);
            })
          })
          .catch(function (error) {
            console.log(error);
          });
          
          displayEvents(hpEvents, eventList);
    }catch (err){
        console.error(err);
    }
};

export const displayEvents = (events, eventList) => {
    console.log(events)
    console.log(events[0])
    const htmlString = events //Just assume the eventlist is on htmlpage
        .map((Event) => {
            console.log(Event)
            return `
            <li class="Event">
                <h2>${Event.eventname}</h2>
                <p>Date: ${Event.sdate}</p>
            </li>
        `;
        })
        .join('');
    eventList.innerHTML = htmlString;
    console.log(eventList)
};

loadEvents();