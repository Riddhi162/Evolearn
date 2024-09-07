import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/DashBoard/Sidebar';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading:authloading} = useSelector((state) => state.auth);
    const {loading:profileloading} = useSelector((state) => state.profile);
    if(profileloading || authloading){
        return (
            <div className='text-white font-bold text-3xl'>Loading...</div>
    )
    }
  return (
    <div className='relative w-[100vw]  flex min-h-[calc[100vh-3.5rem]]'>
        <Sidebar/>
        <div className='h-[calc[100vh-3.5rem]] w-[85%]'>
            <div className='pt-20 w-[100%] h-[100%]  '>
                <Outlet/>
                {/* //to decide which page to show first when we open the profile and will set a default page */}
            </div>
        </div>
    </div>
  )
}

export default Dashboard