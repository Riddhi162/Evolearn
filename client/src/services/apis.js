const BASE_URL = process.env.REACT_APP_BASE_URL

//auth endpoints
export const endpoints = {
    SENDOTP_API: BASE_URL + "/user/sendOtp",
    SIGNUP_API: BASE_URL + "/user/signup",
    LOGIN_API: BASE_URL + "/user/login",
    RESETPASSTOKEN_API: BASE_URL + "/user/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/user/reset-password",
    
}
//profile endpoints
export const profileEndpoints = {
    GET_USER_DETAILS_API:BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API:BASE_URL + "/profile/getEnrolledCourses",
}
export const courseEndpoints={
    GET_ALL_COURSES_API: BASE_URL+"/course/getAllCourses",
    COURSE_DETAILS_API:BASE_URL+"/course/getCourseDetails",
    EDIT_COURSE_API:BASE_URL+"/course/editCourse",
    COURSE_CATEGORIES_API:BASE_URL+"/course/showAllCategories",
    CREATE_COURSE_API:BASE_URL+"/course/createCourse",
    CREATE_SECTION_API:BASE_URL+"/course/addSection",
    CREATE_SUBSECTION_API:BASE_URL+"/course/addSubSection",
    UPDATE_SECTION_API:BASE_URL+"/course/updateSection",
    UPDATE_SUBSECTION_API:BASE_URL+"/course/updateSubSection",
    DELETE_SECTION_API:BASE_URL+"/course/deleteSection",
    DELETE_SUBSECTION_API:BASE_URL+"/course/deleteSubSection",
    DELETE_COURSE_API:BASE_URL+"/course/deleteCourse",
    GET_FULL_COURSE_DETAILS_API:BASE_URL+"/course/getFullCourseDetails",
    LECTURE_COMPLETION_API:BASE_URL+"/course/updateCourseProgress",
    CREATE_RATING_API:BASE_URL+"/course/createrating",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
}
export const categories ={
    CATEGORIES_API : BASE_URL + "/course/showAllCategories",
}
//catalog page data
export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
}
//catalog data
export const catalogData = {
    CATALOGPAGEDATA_API: BASE_URL + "/course/categoryPageDetails",
}
//settings page api
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/user/changePassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile"
}
//rating
export const ratingsEndpoints = {
        REVIEW_DETAILS_API: BASE_URL + "/course/getReviews"
}