

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
        unique: true,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    requests_sent_to:{
        type:String,
    },
    request_received_from:{
        type:String,
    },
    request_event:{
        type:String,
    },
}, {
        timestamps: true,

});
module.exports = mongoose.model('User', userSchema);
