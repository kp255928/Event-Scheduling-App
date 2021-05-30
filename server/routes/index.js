const express = require('express')
const passport = require('passport')
const Event = require('../datamodel/events')
const User = require('../datamodel/user')
const router = express.Router();
// login and re
// router.set('view-engine', 'ejs');

router.get('/register',function(req, res){
    res.render('register.ejs')
});
router.post('/register', (req,res) =>{
  passport.authenticate('register',{
    successRedirect: '/login',
    failureRedirect:'/register',
    failureFlash: true
  })(req, res, next)
})
router.get('/login', function(req, res){
    res.render('login.ejs')
});
router.post('/login',
  passport.authenticate('login', {
    //successRedirect: '/',
    failureRedirect:'/login',
    failureFlash: true
  })
);

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