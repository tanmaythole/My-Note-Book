const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = 'My-note-book-tanmay-764464';

router.get('/', (req, res)=>{
    res.send("hello");
})

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

        res.send({authToken});
    })

router.post('/login', (req, res)=>{
    res.send("Login");
})

module.exports = router;