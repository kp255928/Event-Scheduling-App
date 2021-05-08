import mongoose from 'mongoose'

const userschema = new mongoose.Schema({
    username:{
        type:String,
        unique: true,
        required: true
    },
    password:{
        type:String,
        unique: true,
        required: true
    }
});
modele.export = mongoose.model('User', userschema);