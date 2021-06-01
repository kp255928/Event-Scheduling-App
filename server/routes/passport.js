const LocalStrategy = require('passport-local').Strategy;
const bcrypt =require('bcryptjs')
const User = require('../datamodel/user')
module.exports = function(passport){
    passport.use( new LocalStrategy( {usernameField: 'username'},{passwordField: 'password'},
            (username,password, done)=>{
            User.findOne({username: username}).then(user =>{
                if(!user) return done(null, false, {'message':'This username is not registered'});
                bcrypt.compare(password.toString(), user.password, (err, isMatch)=>{
                    if(err) throw err;
                    if(!isMatch) return done(null, false, {'message': 'incorrect password'});
                    else return done(null, user);
                });
            });
        })
        );

    passport.serializeUser(function(user, done){
        done(null,user.id);
    });
    passport.deserializeUser(function(id,done){
        User.findbyId(id,function(err,user){
            done(err,user);
        });
    });
}