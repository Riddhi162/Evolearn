import { toast } from "react-hot-toast";
import { updateCompletedLectures } from "../../slices/viewCourseSlice";
import { apiConnector } from "../apiconnector";
import { useDispatch } from "react-redux";
import { courseEndpoints } from "../apis";
import { setLoading } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
const {
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_API,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
} = courseEndpoints;

export const getAllCourses = async () => {
  const toastId = toast.loading("Loading..");
  
 
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_COURSE_API);

    console.log("get course API RESPONSE..", response);
    console.log(response.data.success);
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    result = response?.data?.data;
    toast.success("get course successfull");
   
  } catch (error) {
    console.log("get course api ERRor..", error);
    toast.error("couldnt get course");
  }

  toast.dismiss(toastId);
  return result;
};

export const getFullDetailsOfCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  console.log(courseId,token,GET_FULL_COURSE_DETAILS_API)
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_API,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}

export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("Loading..");
    
    let result = [];
    try {
      console.log("in courseApi",courseId)
      console.log(COURSE_DETAILS_API);
      const response = await apiConnector("POST", COURSE_DETAILS_API,{ course_id: courseId });
  
      console.log("get course details API RESPONSE..", response);
      
      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }
     
      result = response.data.data;
   
      toast.success("get course details successfull");
     
    } catch (error) {
      console.log("get course details api ERRor..", error);
      toast.error("couldnt get course");
    }
  
    toast.dismiss(toastId);
    return result;
  };
  


  export const fetchCourseCategories = async () => {
    const toastId = toast.loading("Loading..");
  
    let result = [];
    try {
      const response = await apiConnector("GET", COURSE_CATEGORIES_API);
  
      console.log("get course details API RESPONSE..", response);
      console.log(response.data.success);
      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }
      result = response.data.data;
      toast.success("get course category successfull");
     
    } catch (error) {
      console.log("get course category api ERRor..", error);
      toast.error("couldnt get course category");
    }
  
    toast.dismiss(toastId);
    return result;
  };
  

  export const addCourseDetails = async (data,token) => {
    const toastId = toast.loading("Loading..");
    
    let result = [];
    try {
      const response = await apiConnector("POST", CREATE_COURSE_API,data,{
          "Content-Type": "multipart/form-data",
          Authorization:`Bearer ${token}`
      });
  
      console.log("create course  API RESPONSE..", response);
     
      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }
      result = response.data.data;
      toast.success("create course successfull");
    
    } catch (error) {
      console.log("create course api ERRor..", error);
      toast.error("create course not possible");
    }
  
    toast.dismiss(toastId);
    return result;
  };
  

  export const editCourseDetails = async (data,token) => {
    const toastId = toast.loading("Loading..");
    console.log("here",EDIT_COURSE_API)
    let result = [];
    try {
      const response = await apiConnector("POST", EDIT_COURSE_API,data,{
          "Content-Type": "multipart/form-data",
          Authorization:`Bearer ${token}`
      });
  
      console.log("edit course API RESPONSE..", response);
     
      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }
      result = response.data.data;
      toast.success("edit course successfull");
    
    } catch (error) {
      console.log("edit course api ERRor..", error);
      toast.error("edit course not possible");
    }
  
    toast.dismiss(toastId);
    return result;
  };
  
  export const createSection = async (data,token) => {
    const toastId = toast.loading("Loading..");

    let result = [];
    try {
      console.log("hello",CREATE_SECTION_API)
      const response = await apiConnector("POST", CREATE_SECTION_API,data,{
         
          Authorization:`Bearer ${token}`
      });
  console.log("namaste")
      console.log("create section  API RESPONSE..", response);
      
      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }
      result = response.data.updatedCourseDetails;
 
      toast.success("create section successfull");
  
    } catch (error) {
      console.log("create section api ERRor..", error);
      toast.error("create section not possible");
    }
  
    toast.dismiss(toastId);
    return result;
  };

  export const createSubSection = async (data,token) => {
    const toastId = toast.loading("Loading..");
      console.log(data);
    let result = [];
    try {
      console.log(CREATE_SUBSECTION_API);
      const response = await apiConnector("POST",  CREATE_SUBSECTION_API,data,{

          Authorization:`Bearer ${token}`
      });
  
      console.log("create sub section API RESPONSE..", response);
     
      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }
      result = response.data.data;
      toast.success("create sub section successfull");
     
    } catch (error) {
      console.log("create sub section api ERRor..", error);
      toast.error("create sub section not possible");
    }
  
    toast.dismiss(toastId);
    return result;
  };



  export const updateSection = async (data,token) => {
    const toastId = toast.loading("Loading..");
   
    let result = null;
    try {
      console.log(UPDATE_SECTION_API);
      const response = await apiConnector("POST",  UPDATE_SECTION_API,data,{
        
          Authorization:`Bearer ${token}`
      });
  
      console.log("update section API RESPONSE..", response);
     
      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }
      result = response.data.data;
      toast.success("update section successfull");
      
    } catch (error) {
      console.log("update section api ERRor..", error);
      toast.error("update section not possible");
    }
  
    toast.dismiss(toastId);
    return result;
  };



  export const updateSubSection = async (data,token) => {
    const toastId = toast.loading("Loading..");
  
    let result = [];
    try {
      console.log(UPDATE_SUBSECTION_API)
      const response = await apiConnector("POST",  UPDATE_SUBSECTION_API,data,{
        
          Authorization:`Bearer ${token}`
      });
  
      console.log("update sub section API RESPONSE..", response);
     
      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }
      result = response.data.data;
      toast.success("update sub section successfull");
     
    } catch (error) {
      console.log("update sub section api ERRor..", error);
      toast.error("update sub section not possible");
    }
  
    toast.dismiss(toastId);
    return result;
  };

  export const deleteCourse = async (data,token) => {
    const toastId = toast.loading("Loading..");
    
    let result = [];
    try {
      console.log(DELETE_COURSE_API,data,token)
      const response = await apiConnector("POST",  DELETE_COURSE_API,data,{
        
          Authorization:`Bearer ${token}`
      });
      
      console.log("delete course API RESPONSE..", response);
     
      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }

      result = response.data.data;
      toast.success("delete course successfull");
     
    } catch (error) {
      console.log("delete course api ERRor..", error);
      toast.error("delete course not possible");
    }
  
    toast.dismiss(toastId);
    return result;
  };



  export const deleteSection = async (data,token) => {
    const toastId = toast.loading("Loading..");
   
    let result = [];
    try {
      console.log(DELETE_SECTION_API);
      const response = await apiConnector("POST",  DELETE_SECTION_API,data,{
        
          Authorization:`Bearer ${token}`
      });

      console.log("delete section API RESPONSE..", response);
      
      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }
      result = response.data.data;
      toast.success("delete section successfull");
    
    } catch (error) {
      console.log("delete section api ERRor..", error);
      toast.error("delete section not possible");
    }
  
    toast.dismiss(toastId);
    return result;
  };



  export const deleteSubSection = async (data,token) => {
    const toastId = toast.loading("Loading..");
 
    let result = null;
    try {
      console.log(DELETE_SUBSECTION_API);
      const response = await apiConnector("POST",  DELETE_SUBSECTION_API,data,{
        
          Authorization:`Bearer ${token}`
      });
      
      console.log("delete sub section API RESPONSE..", response);
     
      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }
      result = response.data.data;
      console.log(result)
      toast.success("delete sub section successfull");
    
    } catch (error) {
      console.log("delete sub section api ERRor..", error);
      toast.error("delete sub section not possible");
    }
  
    toast.dismiss(toastId);
    return result;
  };



  export const fetchInstructorCourses = async (token) => {
    let result = []
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector(
        "GET",
        GET_ALL_INSTRUCTOR_COURSES_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )
      console.log("INSTRUCTOR COURSES API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Fetch Instructor Courses")
      }
      result = response?.data?.data
    } catch (error) {
      console.log("INSTRUCTOR COURSES API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }


  export const createRating = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let success = false
    try {
      const response = await apiConnector("POST", CREATE_RATING_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE RATING API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Create Rating")
      }
      toast.success("Rating Created")
      success = true
    } catch (error) {
      success = false
      console.log("CREATE RATING API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return success
  }


  export const markLectureAsComplete = async (data, token) => {
    let result = null
    console.log("mark complete data", data)
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log(
        "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
        response
      )
  
      if (!response.data.message) {
        throw new Error(response.data.error)
      }
      toast.success("Lecture Completed")
      result = true
    } catch (error) {
      console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
      toast.error(error.message)
      result = false
    }
    toast.dismiss(toastId)
    return result
  }