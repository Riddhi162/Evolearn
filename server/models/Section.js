const mongoose = require("mongoose");

const section = mongoose.Schema(
    {
        sectionName:{
            type:String,

        },
        subSection:[{ // Changed to an array of ObjectId references
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubSection",
        }],
      
       
    }
);

module.exports = mongoose.model("Section",section)