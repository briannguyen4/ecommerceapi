const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require("jsonwebtoken");

//Register
router.post('/register', async (req, res) => { // add async
    //Create model object
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.HASHING_KEY).toString(),
    });
    //Send to DB
    try {
        const savedUser = await newUser.save();//add await here and async above because this is a promise, which
        res.status(201).json(savedUser);       //runs asychronously. Must wait for the user to be saved first.
    }catch(err){
        res.status(500).json(err);             //try and catch block in case of an error when saving
    }

});

//Login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if(!user) res.status(401).json("Wrong credentials");

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.HASHING_KEY); 
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (OriginalPassword !== req.body.password) res.status(401).json("Wrong credentials");

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_KEY,
        {expiresIn: "3d"}
        ); 

        const { password, ...others } = user._doc; //use spread operator to destructure user to remove password
        res.status(200).json({...others, accessToken});
    }catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;