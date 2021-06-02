var express = require('express')
var app = express()
const passport = require('passport')
const Event = require('../datamodel/events')
let User = require('../datamodel/user')
const bcrypt = require('bcryptjs')
const router = express.Router();
// login and re
app.set('view-engine', 'ejs');
router.get('/register',function(req, res){
    res.render('register.ejs')
});
router.post('/register', 
  passport.authenticate('local',{
    successRedirect: '/login',
    failureRedirect:'/register',
    failureFlash: true
  })
);

router.route('/register').post((req, res) =>{
  console.log("s")
  var username = req.body.username;
  var password = req.body.password;
  if (password.length<4) return res.status(400).json('password mush be larger than 4')
  User.findOne({'username':username}).then(user =>{
    if(user) return res.status(400).json('username taken')
    else{
      const newUser = new User({
        username,
        password
      });
      bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password, salt, (err,hash)=>{
          if(err) throw errr;
          newUser.password = hash;
          newUser.save().then(user=>{
            req.flash('success','signuped');
            res.redirect('/login')
          })
          .catch(err=>console.log("failed"));
        });    
      });
    }
  });
});



router.get('/login', function(req, res){
  res.render('login.ejs')
});
router.post('/login', (req,res)=>{
  passport.authenticate('login', {
  //successRedirect: '/',
  failureRedirect:'/login',
  failureFlash: true
})
});
router.delete('/logout', (req,res) =>{
    req.logOut()
    res.redirect('/login')
});

router.get('/', (req,res)=> {
  res.redirect('/signup')
});
// about events: add, search( by event name), update event, delete event

function checknotau(req,res, next){
  if(req.isAuthenticated()){
    return res.redirect('/')
  }
  next()
}
module.exports = router;

/*
const newUser = new User();
  newUser.username = req.body.username;
  newUser.password = req.body.password;
  bcrpyt.genSalt(10,(err,salt)=>{
      bcrpyt.hash(newUser.password, salt, (err,hash)=>{
          newUser.password = hash; 
      });
  });
  res.redirct('/login')
  */
 /* const bcrypt = require("bcryptjs")
const passport = require("passport")

router.get('/register',function(req, res){
    res.render('register.ejs')
});

router.route('/register').post((req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    if (password.length<4) return res.status(400).json('password mush be larger than 4')
    User.findOne({'username':username}).then(user =>{
      if(user) return res.status(400).json('username taken')
      else{
        const newUser = new User({
          username,
          password
        });
        bcrypt.genSalt(10,(err,salt)=>{
          bcrypt.hash(newUser.password, salt, (err,hash)=>{
            if(err) throw errr;
            newUser.password = hash;
            newUser.save().then(user=>{
              req.flash('success','signuped');
              res.redirect('/login')
            })
            .catch(err)
          });    
        });
      }
    });
  });

  router.route('/login').post((req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({'username': username}).then(user=>{
        if(!user) return res.status(400).json('username not existed')
        bcrypt.compare(password, user.password, (err, isMatch)=>{
            if(error) throw err;
            if(!isMatch) return res.status(400).json('message', 'incorrect password')
            else {
                req.flash('success','login') 
                res.redirect('/')
            }
        });
    })
  });
  */