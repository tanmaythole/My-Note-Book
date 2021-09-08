const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../Middleware/fetchuser');

const JWT_SECRET_KEY = 'My-note-book-tanmay-764464';

router.get('/', (req, res)=>{
    res.send("hello");
})

// Route 1: Create A user using: POST api/auth/signup
router.post('/signup',[
    body('email', "Enter Valid Email").isEmail(),
    body('password', "Password Mush be more than 4 characters").isLength({min:4}),
    body('name', "Name Should be more than 2 characters").isLength({min:2}),
], async (req, res)=>{
    // If error occured
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({error: "Email Already Taken"})
        }
    
        // creating secure hash password using bcrytjs
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
    
        user = User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
    
    
        // creating auth token using jsonwebtoken
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET_KEY);
        res.json({"status":"ok", authToken});

    } catch (error) {
        res.status(500).send("Internal Server Occured");
    }
});

// Route 2: Authenticate a User: POST api/auth/login
router.post('/login', [
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Password Can not be blank").exists()
], async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        // Checking user find or not
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Please enter correct credentials"});
        }

        // confirming the password
        const checkPass = await bcrypt.compare(password, user.password);
        if(!checkPass){
            return res.status(400).json({error: "Please enter correct credentials"});
        }

        // creating auth token using jsonwebtoken
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET_KEY);
        res.json({"status":"ok", authToken});

    } catch (error) {
        res.status(500).send("Internal Server Occured");
    }
});

// Route 3: Get user data : POST /api/auth/user/
router.post('/user', fetchUser, async (req, res)=>{
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        res.status(500).send("Internal Server Occured");
    }
});

module.exports = router;