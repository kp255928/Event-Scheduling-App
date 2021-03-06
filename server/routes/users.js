var express = require('express');
const { rawListeners } = require('../datamodel/user');
var router = express.Router(); 
let User = require("../datamodel/user");
const bcrypt = require('bcryptjs')
const passport = require("passport")
const passportLocal = require('passport-local').Strategy
router.use(passport.initialize());
router.use(passport.session());
require("../config/passport.js")(passport);

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

router.route('/check_if_being_requested').post(async (req, res) => {
    const {
        username,
    } = req.body;
    console.log(username)
    console.log(req.body.username)
    let user = await User.findOne({username: req.body.username})
    if (user == null){
        return res.send({ message: "user not found"})
    }
    else{
       if(user.request_received_from != null){
            const info = {
                sender: user.request_received_from,
                event: user.request_event
            }
            return res.send(info)
       }else{
            return res.send({ message: "No one requested an event with you"})

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

router.route('/receivedfrom').post(async (req, res) => {
    let user = await User.findOne({username: req.body.username})
    if (user == null){
        return res.status(400).json('User not founds.')
    }
    else{
        return res.send(user.request_received_from);
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




/*
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
              res.redirect('http://localhost:3000/login')
            })
            .catch(err)
          });    
        });
      }
    });
  });
  */

router.get('/home', (req,res)=> {
    res.render('index.ejs', {username: req.username})
});

router.route('/login').post(async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send({ message: "No Username Exists"});
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send({ message: "Successfully Authenticated"});
          console.log(req.user);
        });
      }
    })(req, res, next);
  });

  router.route('/register').post((req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
      if (err) throw err;
      if (req.body.password.length<4) res.send({message:'password mush be larger than 4'});
      if (doc) res.send({ message: "User Already Exists"});
      else if (!doc && req.body.password.length>=4) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
        const newUser = new User({
          username: req.body.username,
          password: hashedPassword,
        });
        await newUser.save();
        res.send({ message: "User Created"});
      }
    });
  });
  router.route('/user').get((req, res) => {
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
  });

/*
  router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('http://localhost:3000/login');
    //if login success, return true, else, return false.
    
  });
*/
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
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    } 
})

module.exports = router;