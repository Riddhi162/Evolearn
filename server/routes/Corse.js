const express = require("express");
const router = express.Router();
const { createCategory, showAllCategories, categoryPageDetails } = require("../controllers/Category");
const { auth, isStudent, isAdmin, isInstructor } = require("../middleware/auth");
const { createRating, getavgRating, getAllRating } = require("../controllers/RatingAndReview");
const { createSection, updateSection, deleteSection } = require("../controllers/Section");
const {createSubSection,updateSubSection,deleteSubSection} = require("../controllers/SubSection")
const {createCourse,getCourseDetails,getAllCourses,
    editCourse,getInstructorCourses,getFullCourseDetails,
    deleteCourse,
    } = require("../controllers/Course")
router.post("/createCourse", auth, isInstructor, createCourse);
router.get("/getAllCourses", getAllCourses);
router.post("/getCourseDetails", getCourseDetails);
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/categoryPageDetails", categoryPageDetails);
router.post("/createRating", auth, isStudent, createRating);
router.post("/getavgRating", getavgRating);
router.post("/getAllRating", getAllRating);
router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);
router.post("/addSubSection", auth, isInstructor, createSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
router.post("/deleteCourse", auth, isInstructor, deleteCourse);
router.post("/editCourse", auth, isInstructor, editCourse)
router.post("/editCourse", auth, isInstructor, editCourse)
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)

router.post("/getFullCourseDetails", auth, getFullCourseDetails)
module.exports = router;
