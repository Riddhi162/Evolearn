const mongoose = require('mongoose');
// const { resetPasswordToken } = require('../controllers/ResetPassword');

const userSchema = mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            trim:true,
        },
        lastName:{
            type:String,
            required:true,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            trim:true,
        },
        password:{
            type:String,
            required:true,
        },
        accountType:{
            type:String,
            enum:["Admin","Student","Instructor"],
            required:true,
        },
        additionalDetails:{
            type:mongoose.Schema.Types.ObjectId,//since we are referring to a different whole model   
            ref:"Profile",
        },
        courses: [{
            type: mongoose.Schema.Types.ObjectId, // referencing the Course model
            ref: "Course",
        }],
        image:{
            type:String,
            required:true
        },
        courseProgress:{
            type:mongoose.Schema.Types.ObjectId,//since we are referring to a different whole model
            ref:"CourseProgress",
        },
        token:{
            type:String,
        },
        resetPasswordExpires:{
            type:Date,
        }
    }
);

module.exports = mongoose.model("User",userSchema)