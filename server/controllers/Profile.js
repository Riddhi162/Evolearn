const Profile = require("../models/Profile")
const User = require("../models/User")
const CourseProgress = require("../models/CourseProgress")
const mongoose = require("mongoose")
const { uploadImageToCloudinary } = require("../utils/imageuploader");
//update profile since already there is a user created

exports.updateProfile = async (req, res) => {
    try {
        console.log("Step1")
        const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
        
        const userId = req.user.id;
        console.log("Step2")
        if (!contactNumber || !gender || !userId) {
            return res.status(400).json({
                success: false,
                message: "Enter all details"
            });
        }
        console.log("Step3")
        const userDetails = await User.findById(userId);
        console.log("Step4")
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const profileId = userDetails.additionalDetails;
        console.log("Step5")
        const profileDetails = await Profile.findById(profileId);
        console.log("Step6")
        if (!profileDetails) {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });
        }

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        console.log("Step8")
        await profileDetails.save();
        console.log("Step9")
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Some problem in profile update"
        });
    }
};

//delete accounnt
exports.deleteAccount = async (req, res) => {
    try {
        const id = req.user.id;
        console.log('User ID:', id);

        // Check if ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID",
            });
        }
        

        // Check if user exists
        const user = await User.findById({ _id: id });
console.log('User Details:', user);


        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Delete additional details if they exist
      
            await Profile.findByIdAndDelete({_id:user.additionalDetails});
        

        // Delete user
        await User.findByIdAndDelete({_id:id});

        // Optionally, handle other related cleanup (e.g., updating enrolled count or handling cron jobs)

        return res.status(200).json({
            success: true,
            message: "User account deleted successfully",
        });
    } catch (error) {
        console.error('Error deleting account:', error); // Log the error for debugging
        return res.status(500).json({
            success: false,
            message: "Error deleting user account",
        });
    }
};



//delete accounnt
exports.getAllUserDetails = async (req,res) => {
    try {
        const id = req.user.id;
        //check if user exists or not
        const userDetails = await User.findById(id).populate("additionalDetails").exec() ;
        return res.status(400).json({
            success:true,
            message:"Data fetched successfully",
            data:userDetails,
        });
       
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Some problem in profile fetching"
        });
    }
}
//
const path = require('path');

// Utility function to send error responses
const sendErrorResponse = (res, statusCode, message, error = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: error ? error.message : undefined,
  });
};

exports.updateProfilePicture = async (req, res) => {
  try {
    console.log("above dp");
    const displayPicture = req.files?.displayPicture; // Use optional chaining to avoid errors
    console.log("before dp");
    const userId = req.user.id;

    if (!displayPicture) {
      return res.status(400).json({
        success: false,
        message: "No display picture provided",
      });
    }

    // Define the upload path
    const profilePhoto = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME
       );
    // const uploadPath = path.join(__dirname, '..', 'uploads', displayPicture.name);

    // Move the file to the desired directory
    // displayPicture.mv(uploadPath, async (err) => {
    //   if (err) {
    //     console.error(err);
    //     return sendErrorResponse(res, 500, "File upload failed", err);
    //   }

      // Update the user's profile picture in the database
      const updatedUser = await User.findByIdAndUpdate(userId, { image: profilePhoto.secure_url}, { new: true });

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Respond with the updated user information
      res.status(200).json({
        success: true,
        message: "Profile picture updated successfully",
        user: updatedUser,
      });
    
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
// exports.getUserEnrolledCourses = async(req,res) => {
//  try {  
//     console.log("Inside user enrolled")
//     const userId = req.user.id;
//     const userDetails = await User.findOne({_id:userId}).populate("courses").exec();

//     if(!userDetails){
//         return res.status(400).json({
//             success:false,
//             message:"Cannot find a user"
//         })
//     }
//     console.log("data is",userDetails)
//     return res.status(200).json({
//         success:true,
//         data:userDetails.courses,
//     })} catch (error) {
//         return res.status(500).json({
//             success:false,
//            message:error.message,
//         })
//  } 
// }

  exports.getUserEnrolledCourses = async (req, res) => {
      try {
        let { courseIds } = req.body;
        const userId = req.user.id;
      

        // Check if courseIds is a string and try parsing it
        if (typeof courseIds === 'string') {
            try {
                courseIds = JSON.parse(courseIds);

                // Validate that courseIds is an array
                if (!Array.isArray(courseIds)) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid format for courseIds: Expected an array",
                    });
                }
            } catch (err) {
                console.error("Error parsing courseIds:", err);
                return res.status(400).json({
                    success: false,
                    message: "Invalid JSON format for courseIds",
                });
            }
        } else if (!Array.isArray(courseIds)) {
            return res.status(400).json({
                success: false,
                message: "courseIds should be an array",
            });
        }

      
    
        let userDetails1 = await User.findOne({
          _id: userId,
        })
       
        userDetails1.courses = [...courseIds];
        
       
        await userDetails1.save();

        // Populate the courses array with detailed information
        userDetails1 = await User.findOne({ _id: userId })
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                    },
                },
            })
            .exec();


            for (let courseId of courseIds) {
             
          
                let progressEntry = new CourseProgress({
                      userId: userId,
                      courses: [courseId],  // Initialize with the current courseId
                      completedVideos: [],  // Initialize as empty if needed
                  });
             
              
          
              await progressEntry.save();
          }

      userDetails1 = userDetails1.toObject()
        var SubsectionLength = 0
        for (var i = 0; i < userDetails1.courses.length; i++) {
          let totalDurationInSeconds = 0
          SubsectionLength = 0
          for (var j = 0; j < userDetails1.courses[i].courseContent.length; j++) {
            // totalDurationInSeconds += userDetails1.courses[i].courseContent[
            //   j
            // ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
            // userDetails1.courses[i].totalDuration = convertSecondsToDuration(
            //   totalDurationInSeconds
            // )
            SubsectionLength +=
              userDetails1.courses[i].courseContent[j].subSection.length
          }
          
          let courseProgressCount = await CourseProgress.findOne({
            courseID: userDetails1.courses[i]._id,
            userId: userId,
          })

          courseProgressCount = courseProgressCount?.completedVideos.length
          if (SubsectionLength === 0) {
            userDetails1.courses[i].progressPercentage = 100
          } else {
            // To make it up to 2 decimal point
            const multiplier = Math.pow(10, 2)
            userDetails1.courses[i].progressPercentage =
              Math.round(
                (courseProgressCount / SubsectionLength) * 100 * multiplier
              ) / multiplier
          }
        }
    
        if (!userDetails1) {
          return res.status(400).json({
            success: false,
            message: `Could not find user with id: ${userDetails1}`,
          })
        }
        return res.status(200).json({
          success: true,
          data: userDetails1.courses,
        })
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        })
      }
    }