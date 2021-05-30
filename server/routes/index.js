const express = require('express');
const passport = require('passport')
const Event = require('../datamodel/events')
const User = require('../datamodel/user')
const router = express.Router();
// login and re
// router.set('view-engine', 'ejs');

router.get('/register',(req, res) =>{
    res.render('register.ejs')
});
router.post('/register', (req, res) => {
    passport.authenticate('local','register', {
      successRedirect:'/login',
      failureRedirect:'/register',
      failureFlash: true
    })
});
router.get('/login', (req, res) => {
    res.render('login.ejs')
});
router.post('/login',async (req,res) => {
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

router.get('/index', (req,res)=> {
  res.render('index.ejs', {
    user: req.user});
});
// about events: add, search( by event name), update event, delete event


module.exports = router;
