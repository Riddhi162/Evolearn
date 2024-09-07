import React, { useState } from 'react'
import {useSelector} from "react-redux"
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { resetPassword } from '../services/operations/authApi';
const UpdatePassword = () => {
    const[showPassword,setShowPassword] = useState(false)
    const[showconfirmPassword,setShowconfirmPassword] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
 
  
    const{loading} = useSelector((state) => state.auth)

    function changeHandler(event) {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    }  
    const[formData,setFormData] = useState({
        password:"",
        confirmPassword:"",
    })
    const {password,confirmPassword} = formData;

    function submitHandler(e) {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1)
        dispatch(resetPassword(password,confirmPassword,token))
    
       
    }
  return (
    <div className='w-screen flex justify-center items-center h-[90vh]'>

        {loading ? (<div>loading</div>):(
            <div className='w-[40%] flex flex-col gap-5'>
                <h1 className='text-violet-400 font-bold text-4xl'>Choose new password</h1>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Almost done enter new password nad youre done</p>
                <form onSubmit={submitHandler} className='flex flex-col gap-10 '>

                <label htmlFor="" className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">New password</p>
                    <input type={showPassword ? "text" :"password"} required name="password" value={password} placeholder='Enter your newpassword' className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5" onChange={changeHandler}/>

                    <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[38px] cursor-pointer ">
                    {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' /> : <AiOutlineEye fontSize={24} fill='#AFB2BF' />}
                </span>
                </label>

                <label htmlFor="" className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">Confirm new password</p>
                    <input  type={showconfirmPassword ? "text" :"password"} required name="confirmPassword" value={confirmPassword}  placeholder='Enter your newpassword' className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5" onChange={changeHandler}/>


                    <span onClick={() => setShowconfirmPassword(!showconfirmPassword)} className="absolute right-3 top-[38px] cursor-pointer ">
                    {showconfirmPassword ? <AiOutlineEyeInvisible fontSize={24} fill='white' /> : <AiOutlineEye fontSize={24} fill='white' />}
                </span>
                </label>

                <button type="submit" className="border-richblack-700 border-2 px-[12px] py-[8px] bg-violet-200/10 text-violet-400 rounded-md">
            Reset
          </button>
                </form>
                <div>
                    <Link to="/login" className=''>
                    <p>Back to login</p>
                    </Link>

                    </div>
            </div>
        )}
    </div>
  )
}

export default UpdatePassword