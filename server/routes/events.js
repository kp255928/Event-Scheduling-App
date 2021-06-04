const router = require('express').Router();
let Event = require('../datamodel/events');
let User = require('../datamodel/user');
//var request = requrire('request');
router.route('/checkconflict').get(async (req,res)=>{
    const sdate = req.body.date;
    const stime = req.body.time;


    const event = await Event.find({username: req.body.username})
    if(event.length === 0) return res.send({message: "No any events added"})
    else{
        console.log(event)
        console.log(sdate, stime)
        for(i=0; i<event.length; i++){
           if(sdate === event[i].sdate){
               // we use 0000->2359 format
               if(stime === event[i].stime){
               return res.send({message:"there is conflict"})
               }
           }
        //    if(sdate.substring(0,2)===event.sdate.substring(0,2)){
        //     if(sdate.substring(2,4)<event.sdate.substring(2,4) && edate.substring(2,4)>event.sdate.substring(2,4))
        //         return res.send({message:"there is conflict"})
        //     if(sdate.substring(2,4)>event.sdate.substring(2,4) && sdate.substring(2,4)<event.edate.substring(2,4))
        //         return res.send({message:"there is conflict"})
           
        }
        return res.send({message:"no conflict found"})
    }
})

router.route('/').get((req, res) => {
    Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error: ' + err));
});
//For later: change the route to activate this if the user clicked "add event"
router.route('/add').post((req, res) => {
    const username = req.body.username;
    //const description = req.body.description;
    const sdate = req.body.date;
    const stime = req.body.time;
    const eventname = req.body.eventname;

    const newEvent = new Event({
        sdate,
        stime,
        eventname,
        username
    });

    newEvent.save()
        .then(() => res.json('Event added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
    Event.findByIdAndDelete(req.params.id)
        .then(() => res.json('Event deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
})

//delete by event id
router.route('/display_event').post(async (req, res) => {
    let events = []
    const username = req.body.username;
      //Where User is you mongoose user model
      Event.find({} , (err, event) => {
        if(err) //do something...
        return res.send("Event or the user is not found")
        event.map(event => {
            if(event.username == username){
                events.push(event.eventname);
            }
        })
        return res.send(events)
    })

});

router.route('/search').get(async (req, res) => {
    const event = await Event.find({eventname: req.body.eventname})
    if (!event.length){
        return res.status(400).json('Event not found.')
    }else{
         //if the event is matched, but the search is not the same as the one created the event, return error.
         //returns an array of events (there could be multiple). Uses a loop to verify username for each event.
         var i;
         for (i = 0; i < event.length; i++) { 
            if (req.body.username !== event[i].username){
                event.splice(i, 1)
            }
         }
         if (!event.length){
            return res.status(400).json('Event not found.')
         }
         return res.json(event)
        }
})

//search by eventname
//request
/*
router.route('/request').post(async(req, res)=>{
    const event = await Event.find({eventname: req.body.eventname})
    const requestuser = await User.find({username: req.body.username})
    if(!requestuser){
        return res.status(400).json('User not found.')
    }
    if (!event){
        return res.status(400).json('Event not found.')
    }
    res.repond(sendrequest(Event.username, requestuser, event));
}
function sendrequest(from, to, eventrequest){
    $.post("/request", {from:from, to:to},function(data){
    })
}

//router.route('/respond').get((req,res)=>{})
*/
//Update event: No need to send all the fields, only those that need to be updated

router.route('/update/:id').post(async (req, res) => {
    const {
        sdate,
        stime,
        eventname,
        username
    } = req.body;
    
    const eventFields= {};
    eventFields.id = req.params.id;
    if (sdate) eventFields.date = sdate.trim();
    if (stime) eventFields.time = stime.trim();
    if (eventname) eventFields.eventname = eventname.trim();
    if (username) eventFields.username = username.trim();


    let event = await Event.findById(req.params.id);
    if (!event){
        return res.status(400).json('No such event.')
    }
    try {
        event = await Event.findByIdAndUpdate(
            req.params.id,
            {$set: eventFields},
            {new: true}
        );
        return res.json("Event updated successfully");
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    } 
})

/*




router.route('/:id').get((req, res) => {
    Event.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').delete((req, res) => {
    Event.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Event.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
*/
module.exports = router;