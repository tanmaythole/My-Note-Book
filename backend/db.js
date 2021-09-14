const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.BACKEND_DATABASE_URI;
const connectToMongo = () =>{
    mongoose.connect(mongoURI, (e)=>{
        console.log(e);
    })
}

module.exports = connectToMongo;