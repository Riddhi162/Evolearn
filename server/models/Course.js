const mongoose = require("mongoose");
const category = require("./category");

const courseSchema = mongoose.Schema(
    {
        courseId:{
            type:String,
            trim:true,
            required:false,
        },
        courseName:{
            type:String,
            trim:true,
            required:true,
        },
        courseDescription:{
            type:String,
            trim:true,
            required:true,
        },
        instructor:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:"true"
        },
       whatYouWillLearn:{
        type:String,
        trim:true,
        required:true,
       },
       courseContent: [{ // Changed to an array of ObjectId references
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
    }],
       ratingAndReviews:{
        
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview",

       },
       price:{
        type:Number,
       },
       thumbnail:{
        type:String,
       },
       category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
       },
       tag:{
        type:String,
       },
       studentsEnrolled:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User",
        default: [],
       },
       status: {
		type: String,
		enum: ["Draft", "Published"],
	},
    createdAt: {
		type:Date,
		default:Date.now
	},
    }
);

module.exports = mongoose.model("Course",courseSchema)