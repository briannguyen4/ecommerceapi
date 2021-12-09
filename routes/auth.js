const router = require('express').Router();
const User = require('../models/User');

//Register
router.post('/register', async (req, res) => { // add async
    //Create model object
    const newUser = new User({
        username: req.body.user,
        email: req.body.email,
        password: req.body.password,
    });
    //Send to DB
    try {
        const savedUser = await newUser.save();//add await here and async above because this is a promise, which
        res.status(201).json(savedUser);       //runs asychronously. Must wait for the user to be saved first.
    }catch(err){
        res.status(500).json(err);             //try and catch block in case of an error when saving
    }

});

module.exports = router;