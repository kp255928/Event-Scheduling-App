

const mongoose = require('mongoose');
//var user = require('./user')
const eventschema = mongoose.Schema({
    sdate: {
        type: String
    },
    stime:{
        type: String
    },
    edate:{
        type: String
    },
    etime:{
        type: String
    },
    //username: [user]
    eventname: {
        type: String
    },
    username: {
        type: String
    }
});

module.exports = mongoose.model('Event', eventschema);