import mongoose from 'mongoose'
const eventschema = mongoose.Schema({
    sdate: {
        type: String,
        required: true
    },
    stime:{
        type: String,
        required: true
    },
    edate:{
        type: String,
        requried: true
    },
    etime:{
        type: String,
        required: true
    },
    user: [userschema]
});
module.exports = mongoose.model('Event', eventschema);