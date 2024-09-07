const mongoose = require("mongoose");
const Course = require("../models/Course");
const Category = require("../models/category");
const Section = require("../models/Section")
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageuploader");
const SubSection = require("../models/SubSection")
const CourseProgress = require("../models/CourseProgress")
const { convertSecondsToDuration } = require("../utils/secToDur")
exports.createCourse = async (req, res) => {
  try {
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
    } = req.body;
    console.log(courseName,price)
    console.log(req.files)
    const thumbnail = req.files.thumbnailImage;
    console.log('Thumbnail image:', thumbnail);

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const courseContent = Course.courseContent;
    const userId = req.user.id; // Corrected to req.user.id
    const instructorDetails = await User.findById(userId);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    const categoryDeatil = await Category.findById(category);
    if (!categoryDeatil) {
      return res.status(400).json({
        success: false,
        message: "Category not valid",
      });
    }
     
     const thumbnailFinal = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
     );
     console.log("hello")
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      category: categoryDeatil._id,
      tag,
      instructor: instructorDetails._id,
     thumbnail: thumbnailFinal.secure_url,
     courseContent: courseContent,
    });

    await User.findByIdAndUpdate(
      instructorDetails._id,
      {
        $push: { courses: newCourse._id },
      },
      { new: true }
    );


    const categoryDetails2 = await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    )
    
    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data:newCourse
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error creating course",
    });
  }
};


//get all courses function remaining
exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find({})
    .populate({
      path: 'courseContent', // Populate the courseContent field
      populate: {
        path: 'subSection', // Populate the subSections within each Section
        model: 'SubSection' // Specify the model for subSections
      }
    })
      .populate('category');
    return res.status(200).json({
      success: true,
      message: "All courses found",
      data: allCourses,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res.status(500).json({
      success: false,
      message: "Error retrieving courses",
    });
  }
};

//get course details
exports.getCourseDetails = async (req, res) => {
  try {
   
    const { course_id } = req.body;
    console.log(course_id)
    const courseDetails = await  Course.findById(course_id)
    .populate({
      path: "instructor",//we ppopulated instructor which means a user 
      populate: {
        path: "additionalDetails",//inside it we populated the additional details also
      },
    })
    .populate("category")
    .populate("ratingAndReviews")
    .populate({
        path:"courseContent",
        populate:{
            path:'subSection',
        },
    }).exec();
      console.log("course details printed",courseDetails)
    
    if(!courseDetails){
        return res.status(400).json({
            success:false,
            message:"couldnt find course in get coursedetails in coure controller",
        })
    }
console.log("overhere")
    return res.status(200).json({
        success:true,
        message:"fetched course details successfully",
        data:courseDetails,
    })
  } catch (error) {
    return res.status(500).json({
        success:false,
        message:"end problem in getting course details in course controler",
    })
  }
};

exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body; // This contains all the fields you want to update
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // If Thumbnail Image is found, update it
    if (req.files && req.files.thumbnailImage) {
      console.log("thumbnail update");
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      course.thumbnail = thumbnailImage.secure_url;
    }

    // Update only the fields that are present in the request body
    Object.keys(updates).forEach((key) => {
      if (key === "tag" || key === "instructions") {
        course[key] = JSON.parse(updates[key]);
      } else {
        course[key] = updates[key];
      }
    });

    await course.save();

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
     
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getInstructorCourses = async(req,res)=>{
  try {
    const instructorId = req.user.id;
    const instructorCourses = await Course.find({instructor: instructorId}).sort({createdAt:-1})

    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}

exports.deleteCourse = async (req, res) => {
  try {
    console.log("hello")
    const { courseId } = req.body
    console.log(req.body)
    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    // const studentsEnrolled = course.studentsEnroled
    // for (const studentId of studentsEnrolled) {
    //   await User.findByIdAndUpdate(studentId, {
    //     $pull: { courses: courseId },
    //   })
    // }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}



exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id
    console.log("ini controller",courseId,userId)
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()
console.log(courseDetails)
    let courseProgressCount = await CourseProgress.findOne({
      courses: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}