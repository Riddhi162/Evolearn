const mongoose = require('mongoose')

require("dotenv").config();
exports.connect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        
    })//to feed the database url in process object we use the dotenv library  see statement 3
    .then(()=>{
        console.log("Connection done")
    })
    .catch((error)=>{
        console.log("Issue in db connection");
        console.log(error.message);
    })
}