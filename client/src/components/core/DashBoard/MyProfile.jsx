import React from 'react';
import IconBtn from '../../common/IconBtn'; 
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const MyProfile = () => {
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
  const handleEditClick = () => {
   navigate("/dashboard/settings")
  };
 


  return (
    <div className='flex flex-col items-center py-10 gap-5 w-[100vw] min-h-[100%] text-richblack-100 '>
      <h1 className='text-violet-400 font-bold text-4xl'>My Profile</h1>
      <div className='w-[80%] h-[20vh] bg-richblack-700/60 flex  justify-between px-10 items-center'>
        <div className='flex items-center'>
        {/* <img 
            src={`${user?.image}`} 
            alt={`profile-${user?.firstName}`} 
            className='aspect-square w-[80px] rounded-full object-cover' 
          /> */}
          <div className=''>
          <p className='text-violet-400 text-lg'>{user?.firstName + " " + user?.lastName}</p>
          <p>{user?.email}</p>
          </div>
        </div>
        {/* <IconBtn 
          text="Edit" 
          onClick={handleEditClick} 
          
          customClasses="extra-class  text-violet-400 text-lg border-2 px-2 rounded-md border-richblack-700"
        /> */}
      </div>

      <div className='w-[80%] h-[20vh] bg-richblack-700/60 flex  justify-between px-10 items-center'>
        <div className='flex flex-col gap-10'>
      
         
          <p className='text-violet-400 text-xl'>About</p>
          <p>{user?.additionalDetails?.about ?? "Write something about yourself"}</p>
         
        </div>
        <IconBtn 
          text="Edit" 
          onClick={handleEditClick} 
         
          customClasses="extra-class  text-violet-400 text-lg border-2 px-2 rounded-md border-richblack-700"
        />
      </div>


      <div className='w-[80%] min-h-[30vh] p-10 bg-richblack-700/60 '>
      <p className='pb-7 text-violet-400 text-xl'>Personal Details</p>
        <div className='gap-10 flex  items-center justify-between'>
            <div className='flex flex-col gap-5'>
                <div className=''>
                <p className=''>First Name:</p>
                <p className='text-richblack-5'>{user?.firstName}</p>
                </div>

                <div>
                <p>Email:</p>
                <p className='text-richblack-5'>{user?.email}</p>
                </div>

                <div>
                <p>Gender:</p>
                <p className='text-richblack-5'>{user?.additionalDetails?.gender}</p>
                </div>
            </div>
            <div className='flex flex-col gap-5'>
            <div>
                <p>Last Name:</p>
                <p className='text-richblack-5'>{user?.lastName}</p>
                </div>

                <div>
                <p>Date of Birth:</p>
                <p className='text-richblack-5'>{user?.additionalDetails?.dateOfBirth}</p>
                </div>

                <div>
                <p>Contact no:</p>
                <p className='text-richblack-5'>{user?.additionalDetails?.contactNumber}</p>
                </div>
            </div>
            <IconBtn 
          text="Edit" 
          onClick={() => {navigate("/dashboard/settings")}} 
          
          customClasses="extra-class text-violet-400 text-lg border-2 px-2 rounded-md border-richblack-700"
          
        />
        </div>
       
      </div>
    </div>
  );
};

export default MyProfile;
//in this the problem happens that once u logged in u will be redirected to this page ok so the user data is set to the values from log in and sign up
//but we know that initial state of user is set to null so when we refresh the data from localstorage will be gone so user value will again set to null for that we need to write those values somewhere so that the data persist so we need to set in local storage the way we set the token in local storage in auth api service in login function