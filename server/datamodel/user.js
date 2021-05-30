

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
        //unique: true, //passwords doesn't have to be unique?
        required: true
    },
}, {
        timestamps: true,

});
module.exports = mongoose.model('User', userSchema);
