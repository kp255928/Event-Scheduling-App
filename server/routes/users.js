var express = require('express');
var router = express.Router(); 
let User = require("../datamodel/user");


router.route('/').get((req, res) => {
    User.find() //find users from the db
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
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