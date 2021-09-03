const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

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
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        .then(user => res.json(user))
        .catch(err => {
            res.json({error:err, message:err.message})
        });
    })

router.post('/login', (req, res)=>{
    res.send("Login");
})

module.exports = router;