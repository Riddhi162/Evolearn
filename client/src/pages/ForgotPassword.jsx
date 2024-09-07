import React, { useState } from 'react'
import CTAButton from "../components/core/Homepage/Button.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { getPasswordResetToken } from '../services/operations/authApi.js';




const ForgotPassword = () => {
    const[emailSent,setEmailSent] = useState(false);
    const[email,setEmail] = useState("");
    const {loading} =useSelector((state)=>state.auth)
const dispatch = useDispatch();


    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent))//the function should be triggeered we also pass setEmailSent here because in the function we will make iyt true so automatically the page that password reset is done will be displayed
    }
  return (
    <div>
  { loading ? (<div>LOADING...</div>): (

    <div className='w-[100vw] flex flex-col justify-center items-center h-[80vh] gap-10'>

        <div className="w-[50%] flex flex-col gap-5 ">
      <h1 className='text-violet-400 font-bold text-4xl'>
        {
            !emailSent ?"Reset your password":"Check your email"
        }
      </h1>
      <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
      {
            !emailSent ?"Have no fear Reset your password by giving your email id in the below field.":`Email sent successfully on ${email}`
        }
      </p>
      <form action="" onSubmit={handleSubmit}>
      {
            !emailSent && (
                <label htmlFor="" className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">Email Id*</p>
                    <input type="email" required name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email address' className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"/>
                </label>
  )
           
        }

<button active={true} type="submit" className='border-richblack-700 border-2 px-[12px] py-[8px] bg-violet-300 text-violet-900 rounded-md mt-10'>
           
         {
            !emailSent ? "Reset Password":"Reset Email"
} </button>
      </form>
      </div>
    </div>)}
    </div>
  )
}

export default ForgotPassword