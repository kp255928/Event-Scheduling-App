var express = require('express');
const { rawListeners } = require('../datamodel/user');
var router = express.Router(); 
let User = require("../datamodel/user");


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

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const newUser = new User({ username,password }); //database call

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
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