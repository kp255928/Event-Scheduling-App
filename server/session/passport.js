const localstrategy = require('passport-local').Strategy
const bcrypt =require('bcrypt')
const User = require('../datamodel/user')
const register = require('./register')
module.exports = function(passport){
    register(passport);
    passport.use('login', new localstrategy(
        {passReqToCallback: true},
        function(req, username, password, done){
            User.findOne({'username': username}).then(user =>{
                if(!user) return done(null, false, req.flash('message','This username is not registered'));
                bcrypt.compare(password, user.passowrd, (err, isMatch)=>{
                    if(error) throw err;
                    if(!isMatch) return done(null, false, req.flash('message', 'incorrect password'));
                    else return done(null, user);
                });
            });
        }
    ));
    passport.serializeUser(function(user, done){
        done(null,user.id);
    });
    passport.deserializeUser(function(id,done){
        User.findbyId(id,function(err,user){
            done(err,user);
        });
    });
}