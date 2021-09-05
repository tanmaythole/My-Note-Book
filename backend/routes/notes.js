const express = require('express');
const Notes = require('../models/Notes');
const fetchUser = require('../Middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Route 1: Fetch All Notes of user: GET /api/notes/fetchallnotes
router.get('/fetchallnotes', fetchUser, async (req, res)=>{
    try {
        const notes = await Notes.find({user:req.user.id});
        res.json(notes);
    } catch (error) {
        res.status(500).send("Internal Server Occured");
    }
});

// Route 2: Add a New Note: POST /api/notes/add
router.post('/add', fetchUser, [
        body('title', 'Title Cannot be blank').exists(),
        body('description', 'Description Can not be blank').exists()
    ], async (req, res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            // destructuring elements from req
            const { title, description, tag } = req.body;

            // create a new note
            const note = new Notes({
                title, description, tag, user: req.user.id
            });
            const savedNote = await note.save();
            
            res.json({savedNote});

        } catch (error) {
            res.status(500).send("Internal Server Occured");
        }
    });

// Route 3: Update an existing note : PUT /api/notes/update/id
router.put('/update/:id', fetchUser, async (req, res)=>{
    try {
        const {title, description, tag} = req.body;

        // Fetch note by id
        let note = await Notes.findById(req.params.id);
        // If note not found
        if(!note){
            return res.status(404).send("Not Found");
        }
        // If note not authorize to this user
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Access Denied");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set:{title, description, tag}}, {new:true});
        res.json({note});

    } catch (error) {
        res.status(500).send("Internal Server Occured");
    }
});

// Route 4: Delete an Note: DELETE /api/notes/delete/id
router.delete('/delete/:id', fetchUser, async (req, res)=>{
    try {
        // Fetch note by id
        let note = await Notes.findById(req.params.id);
        // If note not found
        if(!note){
            return res.status(404).send("Not Found");
        }
        // If note not authorize to this user
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Access Denied");
        }

        note = await Notes.findByIdAndDelete(req.params.id);

        res.json({"success":"Note has been deleted."});
    } catch (error) {
        res.status(500).send("Internal Server Occured");
    }
})

module.exports = router