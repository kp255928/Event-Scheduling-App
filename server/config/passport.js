const localStrategy = require('passport-local').Strategy;
const bcrypt =require('bcryptjs')
const User = require('../datamodel/user')

/*
module.exports = function(passport){
    passport.use( new LocalStrategy( {username: 'username'}, 
            (username,password, done)=>{
            User.findOne({username: username}).then(user =>{
                if(!user) return done(null, false, {'message':'This username is not registered'});
                bcrypt.compare(password, user.password, (err, isMatch)=>{
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
*/
module.exports = function (passport) {
    passport.use(
      new localStrategy((username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
          if (err) throw err;
          if (!user) return done(null, false);
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        });
      })
    );
  
    passport.serializeUser((user, cb) => {
      cb(null, user.id);
    });
    passport.deserializeUser((id, cb) => {
      User.findOne({ _id: id }, (err, user) => {
        const userInformation = {
          username: user.username,
        };
        cb(err, userInformation);
      });
    });
  };