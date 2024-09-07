import { endpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import{setUser} from "../../slices/profileSlice"
import { setLoading } from "../../slices/authSlice";
import { toast } from "react-hot-toast";
import { setToken } from "../../slices/authSlice";
import { useNavigate } from 'react-router-dom';
import {settingsEndpoints} from "../apis"
import { profileEndpoints } from "../apis";
const{
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API
} = endpoints

const{
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
} = settingsEndpoints

const {
    GET_USER_DETAILS_API,
    GET_USER_ENROLLED_COURSES_API
}= profileEndpoints

export const sendOtp = (email,navigate) => {
  
    return async(dispatch) =>{
         console.log("Navigate is: ", navigate);
        const toastId = toast.loading("Loading..")
        dispatch(setLoading(true));
        try {
        
            console.log("Sending request to:", SENDOTP_API);
            const response = await apiConnector("POST", SENDOTP_API,{email,checkUserPresent:true,})
            console.log("SENDOTP API RESPONSE..", response)
            console.log(response.data.success)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("otp sent")
            navigate("/verify-email")
           dispatch(setLoading(false));
        } catch (error) {
            console.log("SENDOTP API ERRor..", error)
            toast.error("couldnt send otp")
        }
     
        toast.dismiss(toastId)
    }}


    export const signUp = (
       
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        otp,
        navigate
    ) =>{
        return async(dispatch) =>{
            
            const toastId = toast.loading("Loading..")
            dispatch(setLoading(true));
            try {
                console.log("Sending request to:", SIGNUP_API);
                console.log("Email:", email); // Log email
                console.log("Password:", password);
                console.log("fname:", firstName);
                console.log("lname:", lastName);
                console.log("condfirm:", confirmPassword);
                console.log("accounttype:", accountType);
                console.log("otp",otp);
               const response = await apiConnector("POST",SIGNUP_API,{
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
               })
               
               console.log("SIGNUP API RESPONSE..", response)
               console.log(response.data.success)
               if(!response.data.success){
                throw new Error(response.data.message)
            } 
            toast.success("signup successfull")
            dispatch(setLoading(false));
             navigate("/login")
            } catch (error) {
                console.log("signup api ERRor..", error)
                toast.error("couldnt signup");
                // navigate("/signup")
            }
           
            toast.dismiss(toastId)
        }
    }

    export const login = (
        
        email,
        password,
        navigate
    ) =>{
        return async(dispatch) =>{
            const toastId = toast.loading("Loading..")
            dispatch(setLoading(true));
            
            try {
                console.log("Sending request to:", LOGIN_API);
                console.log("Email:", email); // Log email
                console.log("Password:", password);
              
               const response = await apiConnector("POST",LOGIN_API,{
                
                email,
                password,
                
             
               })
               console.log("error her")
               console.log("LOGIN API RESPONSE..", response)
               console.log(response.data.success)
               if(!response.data.success){
                throw new Error(response.data.message)
            } 
            toast.success("login successfull")
            dispatch(setToken(response.data.token))//we included the token

            const userImage = response.data?.user?.image ? response.data.user.image : `https://api.dicebar.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

            dispatch(setUser({...response.data.user,image:userImage}))

            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            navigate("/dashboard/my-profile")

            } catch (error) {
                console.log("login api ERRor..", error)
                toast.error("couldnt login");
                
            }
            dispatch(setLoading(false));
            toast.dismiss(toastId)
        } 
    }

export const getPasswordResetToken = (email,setEmailSent) => {
  
        return async(dispatch) =>{
            dispatch(setLoading(true));
            try {
                console.log(RESETPASSTOKEN_API)
                const response = await apiConnector("POST", RESETPASSTOKEN_API,{email})
                console.log(response);
                if(!response.data.success){
                    throw new Error(response.data.message)
                }
                toast.success("Reset email sent")
                setEmailSent(true);
            } catch (error) {
                console.log("reset password token error")
            }
            dispatch(setLoading(false));
        }

}
export const resetPassword=(password,confirmPassword,token)=>{
    return async(dispatch) =>{
        dispatch(setLoading(true));
        try {
            console.log(password);
            console.log(confirmPassword);
             console.log(RESETPASSWORD_API)
            const response = await apiConnector("POST", RESETPASSWORD_API,{password,confirmPassword,token})
            console.log("hi")
            console.log(response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Password is reset successfully")
        

        }
            catch(error){
                console.log("reset password  error",error)
                toast.error("couldnt reset password");
            }
            dispatch(setLoading(false));
}
}


export const updateDetails=(dateOfBirth,about,gender,contactNumber,token,navigate)=>{
    return async(dispatch) =>{
        dispatch(setLoading(true));
        try {
         
             console.log(UPDATE_PROFILE_API)
            const response = await apiConnector("PUT", UPDATE_PROFILE_API,{dateOfBirth,about,gender,contactNumber,token})
            console.log("hi")
            console.log(response);
         
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Profile information updated successfully")
          

            // Update localStorage
           
            navigate("/dashboard/my-profile")

        }
            catch(error){
                console.log(error)
                toast.error("couldnt update profile details");
            }
            dispatch(setLoading(false));
}
}


export const changePassword=(email,password,newPassword,confirmNewPassword,token,navigate)=>{
    return async(dispatch) =>{
        dispatch(setLoading(true));
        try {
         
             console.log(CHANGE_PASSWORD_API)
            const response = await apiConnector("POST", CHANGE_PASSWORD_API,{email,password,newPassword,confirmNewPassword,token})
            console.log("hi")
            console.log(response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Profile password updated successfully")
            navigate("/dashboard/my-profile")

        }
            catch(error){
                console.log(error)
                toast.error("couldnt update profile password");
            }
            dispatch(setLoading(false));
}
}

export async function getUserEnrolledCourses (courses,token){
   
    const toastId = toast.loading("Loading...");
    let result=[]
    try {
        console.log("before api token", GET_USER_ENROLLED_COURSES_API,token);
        // console.log("before api courses", GET_USER_ENROLLED_COURSES_API,courses);
        const courseIds = JSON.stringify(courses)
        console.log(courseIds)
        const response = await apiConnector(
            "POST",
            GET_USER_ENROLLED_COURSES_API,
            { courseIds},

            {
                "Content-Type": "multipart/form-data",
                Authorization:`Bearer ${token}`
            }
        );
        console.log("after api");
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        result = response.data.data
        console.log(response)
        toast("Success")
    } catch (error) {
        console.log(error)
        toast.error("couldnt find enrolled courses");
    }
    toast.dismiss(toastId)
    return result;
   
}


export function updateProfile(token, formData) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
          Authorization: `Bearer ${token}`,
        })
        console.log("UPDATE_PROFILE_API API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        const userImage = response.data.updatedUserDetails.image
          ? response.data.updatedUserDetails.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
        dispatch(
          setUser({ ...response.data.updatedUserDetails, image: userImage })
        )
        toast.success("Profile Updated Successfully")
      } catch (error) {
        console.log("UPDATE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Update Profile")
      }
      toast.dismiss(toastId)
    }
  }