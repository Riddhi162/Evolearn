const mongoose = require("mongoose");
const courseProgress = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        courses: [{
            type: mongoose.Schema.Types.ObjectId, // referencing the Course model
            ref: "Course",
        }],
        completedVideos: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subSection',
        }],
       
    }
);

module.exports = mongoose.model("CourseProgress",courseProgress)