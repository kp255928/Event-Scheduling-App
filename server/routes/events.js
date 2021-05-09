const router = require('express').Router();
let Event = require('../datamodel/events');

router.route('/').get((req, res) => {
    Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error: ' + err));
});
//For later: change the route to activate this if the user clicked "add event"
router.route('/add').post((req, res) => {
    const username = req.body.username;
    //const description = req.body.description;
    const sdate = req.body.sdate;
    const stime = req.body.stime;
    const edate = req.body.edate;
    const etime = req.body.etime;

    const newEvent = new Event({
        username,
        sdate,
        stime,
        edate,
        etime,
    });

    newEvent.save()
        .then(() => res.json('Event added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});
/*
router.route('/:id').get((req, res) => {
    Event.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
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