const mongoose = require("mongoose");

const ratingAndReviewSchema = mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        ratings:{
            type:Number,
            required:true
        },
        review:{
            type:String,
            trim:true,
        }, 
        course:{
              type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    }
);

module.exports = mongoose.model("RatingAndReview",ratingAndReviewSchema)