const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

const { updateProfile, deleteAccount, getAllUserDetails,updateProfilePicture, getUserEnrolledCourses } = require("../controllers/Profile");

router.delete("/deleteprofile",auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getAllUserDetails);
router.put("/updateProfilePicture", auth, updateProfilePicture);
router.post("/getEnrolledCourses",auth,getUserEnrolledCourses)

module.exports = router;
