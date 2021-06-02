var express = require('express');
const { rawListeners } = require('../datamodel/user');
var router = express.Router(); 
let User = require("../datamodel/user");
const bcrypt = require('bcryptjs')
const passport = require("passport")
require('../config/passport.js')(passport);

router.route('/search').get(async (req, res) => {
    const username = req.body.username;
    console.log(username)
    let user = await User.findOne({username: req.body.username})
    if (user == null){
        return res.status(400).json('User not founds.')
    }
    // if the request has password in it (such as for login verification), this verifies password. Otherwise, it returns user as is.
    else{
        if(req.body.password){
            if(req.body.password !== user.password)
            {
                return res.status(400).json('Password Mismatch')
            }
            else{
                return res.json(user)
            }
        }
        else{
        console.log(user)
        return res.json(user)
        
        }
    }
});
router.route('/search_user_to_invite').post(async (req, res) => {
    const {
        user_to_invite,
        username,
        event
    } = req.body;
    const userFields= {};
    if (user_to_invite == req.body.username) { //cannot invite themselves
        user_to_invite = null;
    }else{

    
        let user = await User.findOne({username: req.body.user_to_invite})
        if (user == null){
            return res.status(400).json('Cannot Invite: Cannot find the required user in the database')
        }
        else{
            userFields.id = user._id
            //if (user_to_invite) userFields.requests_sent_to = user_to_invite.trim();
            if (username) userFields.request_received_from = username.trim();
            if (event) userFields.request_event = event.trim();
            if(req.body.username && req.body.event){
                user = await User.findByIdAndUpdate(
                    userFields.id,
                    {$set: userFields},
                    {new: true}
                );
                let current_user = await User.findOne({username: req.body.username})
                if(current_user){
                    const changeFields= {};
                    changeFields.requests_sent_to = user_to_invite.trim();
                    current_user = await User.findByIdAndUpdate(
                        current_user._id,
                        {$set: changeFields},
                        {new: true}
                    );
                }
                return res.json("User invited");
            }
            
            else{
                return res.status(400).json('the requster or the event to request is empty')
        
            }
        }
    }

});

router.route('/check_if_being_requested').get(async (req, res) => {
    let user = await User.findOne({username: req.body.username})
    if (user == null){
        return res.status(400).json('User not founds.')
    }
    else{
       if(user.request_received_from != null){
            const info = {
                sender: user.request_received_from,
                event: user.request_event
            }
            return res.json(info);
       }else{
            return res.json("no one requested an event with you");

       }

    }

});

router.route('/accept_event_Invitation').post(async (req, res) => {
    let user = await User.findOne({username: req.body.username})
    if (user == null){
        return res.status(400).json('User not founds.')
    }
    else{
        const info = {
            sender: user.request_received_from,
            event: user.request_event
        }
        const userFields= {};
        userFields.id = user._id
        userFields.request_received_from = null;
        userFields.request_event = null;
        user = await User.findByIdAndUpdate(
            user._id,
            {$set: userFields},
            {new: true}
        );
        return res.json(info);
    }

});

router.route('/deny_event_Invitation').post(async (req, res) => {
    let user = await User.findOne({username: req.body.username})
    if (user == null){
        return res.status(400).json('User not founds.')
    }
    else{
        const userFields= {};
        userFields.id = user._id
        userFields.request_received_from = null;
        userFields.request_event = null;
        user = await User.findByIdAndUpdate(
            user._id,
            {$set: userFields},
            {new: true}
        );
    }

});

router.route('/add').post((req, res) => {
    console.log("ss")
    const username = req.body.username;
    const password = req.body.password;
    const newUser = new User({ username,password }); //database call

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
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
              console.log("?")
              res.redirect('/login')
            })
            .catch(err)
          });    
        });
      }
    });
  });
  
  router.get('/home', (req,res)=> {
    res.render('index.ejs', {username: req.username})
    });


  router.get('/login', passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/register');
    //if login success, return true, else, return false.
    
  });

router.route('/delete/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User removed.'))
        .catch(err => res.status(400).json('Error: ' + err));
})


//Update user: only send the fields that need to be updated

router.route('/update/:id').post(async (req, res) => {
    const {
        username,
        password
    } = req.body;
    
    const userFields= {};
    userFields.id = req.params.id;
    if (username) userFields.username = username.trim();
    if (password) userFields.password = password.trim();


    let user = await User.findById(req.params.id);
    if (!user){
        return res.status(400).json('No such user.')
    }
    try {
        user = await User.findByIdAndUpdate(
            req.params.id,
            {$set: userFields},
            {new: true}
        );

        return res.json("User updated succesfully");
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    } 
})

module.exports = router;