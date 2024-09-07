const RatingAndReview = require("../models/RatingAndReview")
const Course = require("../models/Course");

// createrating
exports.createRating = async(req,res) =>{

    try {
        const[courseId,rating,review] = req.body;
        const userId = req.body.user;
        //check if user is already enrolled
        const courseDetails = await Course.findOneById({id:courseId,
                studentsEnrolled:{$elemMatch: {$eq: userId} }
        })
    
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student not already enrolled"
            })
        }
    
        const alreadyReviewed = await RatingAndReview.findOne({
            user:userId,
            course:courseId,
        })
        //create rating and review
        if(alreadyReviewed){
            return res.status(404).json({
                success:false,
                message:"course already reviewed by user"
            }) 
        }
        //create rating and review
        const createRating = await RatingAndReview.create({
            rating,review,course:courseId,user:userId
        });
        //update courses with given ratings
        await Course.findByIdAndUpdate(
            {_id:courseId},{
               $push: {
                    ratingAndReview : createRating._id,
                }
            },{new:true}
        )

        return res.status(200).json({
            success:true,
            message:"Rating and review created successfully",
            createRating
        })
    } catch (error) {
        return res.status(404).json({
            success:false,
            message:"unable to give ratings"
        })
    }
    
}
//get avg rating
exports.getavgRating = async(req,res) =>{
    try {
        //get courseid 
        const {courseId} = req.body.courseId;
        //calculate avg ratings
        const result = await RatingAndReview.aggregate({
            $match:{
                course:new mongoose.Types.ObjectId(courseId),//converted string to object
            },//from ratings and review i want those blocks whose course id matches the given course
            $group:{
                _id:null,
                averageRating : {$avg:"$rating"}
            }
        })

        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
        }
        //return 
        return res.status(200).json({
            success:true,
            message:"Average rating is 0",
            averageRating:0,
        })

    } catch (error) {
        return res.status(404).json({
            success:false,
            message:"unable to fetch average ratings"
        })
    }
}
//get all rating

exports.getAllRating = async(req,res) => {
    try {
        const allRatAndRev = await RatingAndReview.find({}).sort({rating:desc}).populate({
            path:"user",
            select:"firstName lastName email image"
        })
        .populate({
            path:"course",
            select:"courseName"
        })
        .exec();
        return res.status(200).json({
            success: true,
            message: "all ratings and reviews found",
            data:allRatAndRev,
          });
    } catch (error) {
        return res.status(404).json({
            success:false,
            message:"unable to get al rating and review"
        })
    }
}