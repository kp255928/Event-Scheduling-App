var express = require('express')
const passport = require('passport')
const { rawListeners } = require('../datamodel/user');
let User = require('../datamodel/user')
const bcrypt = require('bcrypt')
var router = express.Router();
// login and re
// router.set('view-engine', 'ejs');
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
  res.render('index.ejs', {
    user: req.user});
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