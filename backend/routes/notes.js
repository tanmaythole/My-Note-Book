const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    obj = {
        a:1
    }
    console.log(obj);
    res.send(obj);
})

module.exports = router