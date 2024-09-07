import React, { useState } from 'react'
import IconBtn from '../../common/IconBtn';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { updateDetails } from '../../../services/operations/authApi';
import { changePassword } from '../../../services/operations/authApi';
const Settings = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.profile);
    const token = user.token;
    const email = user.email;
    const [fileName, setFileName] = useState('')
    const [showCreatePass, setShowCreatePass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setFileName(file.name);
        } else {
          setFileName('');
        }
      };
     
      const [formData, setFormData] = useState({
       
        dateOfBirth: "",
        gender: "",
        contactNumber: "",
        about: "",
        password:"",
        newPassword:"",
        confirmNewPassword:""
      });

    
       
  const handleEditClick = () => {
   navigate("/dashboard/settings")
  };
 
  const handleUpload=()=>{
    const fileInput = document.getElementById('profilePicture');
    const file = fileInput.files[0];

    if (!file) {
      alert('Please select a file before uploading.');
      return;
    }
  }
  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }
  async function submitHandler(e) {
    e.preventDefault();
    dispatch(updateDetails(
      formData.dateOfBirth, 
      formData.about, 
      formData.gender, 
      formData.contactNumber,token,navigate
    ));
  }
  async function submitHandler2(e) {
    e.preventDefault();
    dispatch(changePassword(email,formData.password,formData.newPassword,formData.confirmNewPassword,token,navigate));
   }
  return (
    <div>
         <div className='flex flex-col items-center py-10 gap-5 w-[100%] min-h-[100%] text-richblack-100 '>
      <h1 className='text-violet-400 font-bold text-4xl'>Edit Profile </h1>
      //image uodate
      {/* <div className='w-[80%] h-[20vh] bg-richblack-700/60 flex  justify-between px-10 items-center'>
        <div className='flex items-center'>
        <img 
            src={`${user?.image}`} 
            alt={`profile-${user?.firstName}`} 
            className='aspect-square w-[80px] rounded-full object-cover' 
          />
          <div className=''>
          <p className='text-violet-400 text-lg'>Update Profile Picture</p>
          
          <input 
        type='file' 
        id='profilePicture' 
        className='mt-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100' 
        accept='image/*'
      />
      <button 
        onClick={handleUpload} 
        className='mt-2 bg-violet-500 text-white px-4 py-2 rounded-md hover:bg-violet-600'
      >
        Upload
      </button>
          </div>
        </div> */}
{/*         
      </div> */}
//details update
      <div className='w-[80%] min-h-[40vh] bg-richblack-700/60 flex  justify-between p-10 items-center'>
        <div className='flex flex-col gap-10 w-[100%]'>
      
         
          <p className='text-violet-400 text-xl'>Change Profile Information</p>
          <form onSubmit={submitHandler} className="w-[100%] flex flex-col gap-5">
        <div className="flex gap-x-4 ">
          <label htmlFor="" className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              required
              placeholder="Enter First Name"
              onChange={changeHandler}
              value={formData.firstName}
              name="firstName"
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
            />
          </label>

          
          <label htmlFor="" className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              required
              placeholder="Enter Last Name"
              onChange={changeHandler}
              value={formData.lastName}
              name="lastName"
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
            />
          </label>
        </div>
  <div className="flex gap-x-4">
        <label htmlFor="" className="w-full">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Date of Birth
            <sup className="text-pink-200">*</sup>
          </p>

          <input
            type="dateOfBirth"
            required
            placeholder="Enter your dateOfBirth "
            value={formData.dateOfBirth}
            onChange={changeHandler}
            className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
            name="dateOfBirth"
          />
        </label>

      
        <label htmlFor="" className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Gender <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              required
              placeholder="Enter your Gender"
              onChange={changeHandler}
              value={formData.gender}
              name="gender"
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
            />
          </label>

          </div>
          <div className="flex gap-x-4">
          <label htmlFor="" className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Contact no. <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              required
              placeholder="Enter First Name"
              onChange={changeHandler}
              value={formData.contactNumber}
              name="contactNumber"
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
            />
          </label>



          <label htmlFor="" className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
             About <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              required
              placeholder="Enter about you"
              onChange={changeHandler}
              value={formData.about}
              name="about"
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
            />
          </label>
          </div>
          <button type="submit" className="border-richblack-700 border-2 px-[12px] py-[8px] bg-violet-200/10 text-violet-400 rounded-md">
            Submit
          </button>
        </form>
        <div className='flex gap-4 justify-center'>
        <IconBtn 
          text="Cancel" 
          
          onClick={() => {navigate("/dashboard/my-profile")}} 
          customClasses="extra-class bg-richblack-5 text-violet-900 text-lg border-2 px-2 rounded-md border-richblack-700"
        />
        </div>
        </div>
       
      </div>

//password update
      <div className='w-[80%] min-h-[30vh] p-10 bg-richblack-700/60 '>
      <p className='pb-7 text-violet-400 text-xl'>Change Password</p>
      <form onSubmit={submitHandler2} className="w-[100%]  flex flex-col gap-5">
      <div className="flex gap-x-4  w-full">


      <label htmlFor="relative ">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Original Password
              <sup className="text-pink-200">*</sup>
            </p>

            <input
              type={showCreatePass ? "text" : "password"}
              required
              placeholder="Enter Original Password"
              onChange={changeHandler}
              value={formData.password}
              name="password"
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
            />
            <span
              onClick={() => setShowCreatePass(!showCreatePass)}
              className="absolute right-3 top-[38px] cursor-pointer z-10"
            >
              {showCreatePass ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          <label htmlFor="relative ">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Create Password
              <sup className="text-pink-200">*</sup>
            </p>

            <input
              type={showCreatePass ? "text" : "password"}
              required
              placeholder="Enter New Password"
              onChange={changeHandler}
              value={formData.newPassword}
              name="newPassword"
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
            />
            <span
              onClick={() => setShowCreatePass(!showCreatePass)}
              className="absolute right-3 top-[38px] cursor-pointer z-10"
            >
              {showCreatePass ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          <label htmlFor="" className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Confirm New Password
              <sup className="text-pink-200">*</sup>
            </p>

            <input
              type={showConfirmPass ? "text" : "password"}
              required
              placeholder="Confirm Password"
              onChange={changeHandler}
              value={formData.confirmNewPassword}
              name="confirmNewPassword"
              className="bg-richblack-800 rounded-[0.75rem]  p-[12px] text-richblack-5"
            />

            <span
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              className="absolute right-3 top-[38px] cursor-pointer z-10"
            >
              {showConfirmPass ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <div className='flex gap-4 justify-center'>
        <IconBtn 
          text="Cancel" 
          onClick={() => {navigate("/dashboard/my-profile")}} 

          customClasses="extra-class bg-richblack-5 text-violet-900 text-lg border-2 px-2 rounded-md border-richblack-700"
        />
        <button type="submit" className="border-richblack-700 border-2 px-[12px] py-[8px] bg-violet-200/10 text-violet-400 rounded-md">
            Submit
          </button></div>
        </form>
        
      </div>

      
    </div>
    </div>
  )
}

export default Settings