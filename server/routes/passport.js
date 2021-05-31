const localstrategy = require('passport-local').Strategy
const bcrypt =require('bcryptjs')
const passport = require('passport')
const User = require('../datamodel/user')
module.exports = function(passport){
    passport.use('register', new localstrategy(
        {passReqToCallback: true},
        function(req,username,password, done){
            //const username = req.body.username;
            //const password = req.body.password;
            if(password.length <4){
                return done(null, false, req.flash('message', 'password must be at least 4 characters'));
            }
            User.findOne({'username':username}),(user, err)=>{
                if(err) return done(null, false, req.flash('message', 'error'))
                console.log("sdfsafasfa")
                if(user){
                    return done(null, false, req.flash('message', 'username existed'))
                }else{
                    const newUser = new User();
                    newUser.username = username;
                    newUser.password = password;
                    bcrpyt.genSalt(10,(err,salt)=>{
                        bcrpyt.hash(newUser.password, salt, (err,hash)=>{
                            newUser.password = hash; 
                            newUser.save(function(err){
                                if(error) throw err;
                                return done(null, newUser);
                            });
                        });    
                    });
                }
            }
        }  
    ));
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