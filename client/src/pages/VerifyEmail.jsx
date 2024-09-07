import React, { useEffect } from 'react'
import { useState } from 'react'
import {useSelector} from "react-redux"
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import OTPInput from "react-otp-input"
import { sendOtp, signUp } from '../services/operations/authApi';
const VerifyEmail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const[otp,setOtp] = useState("")
  
    const{signupData,loading} = useSelector((state) => state.auth)
    // function changeHandler(event) {
    //     setFormData((prev) => ({
    //         ...prev,
    //         [event.target.name]: event.target.value,
    //     }));
    // }  
    
   
    useEffect(()=>{
        if(!signupData){
            navigate("/signup");
        }
    },[])
    function submitHandler(e) {
        e.preventDefault();
        const {firstName, lastName, email, password, confirmPassword,accountType} = signupData;
        dispatch(signUp(firstName, lastName, email, password, confirmPassword,accountType,otp,navigate))
    
       
    }
  return (
    <div className='w-screen flex justify-center items-center h-[90vh]'>

        {loading ? (<div>loading</div>):(
            <div className='w-[40%] flex flex-col gap-5'>
                <h1 className='text-violet-400 font-bold text-4xl'>Verify Email</h1>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Check the verification code on your email</p>

                <form onSubmit={submitHandler} className='flex flex-col gap-10 '>

                <OTPInput value={otp} onChange={setOtp} numInputs={6} renderInput={(props) =><input {...props}/>}/>






               

                

                <button type="submit" className="border-richblack-700 border-2 px-[12px] py-[8px] bg-violet-200/10 text-violet-400 rounded-md">
            Verify Email
          </button>
                </form>
                <div>
                    <Link to="/login" className=''>
                    <p>Back to login</p>
                    </Link>

                    </div>

                    <button onClick={()=> dispatch(sendOtp(signupData.email,navigate))} className="border-richblack-700 border-2 px-[12px] py-[8px] bg-violet-200/10 text-violet-400 rounded-md">
            Resend
          </button>
            </div>
        )}
    </div>
  )
}

export default VerifyEmail