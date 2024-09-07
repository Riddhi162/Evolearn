import React, { useState } from 'react'
import {sidebarlinks} from "../../../data/sidebar-links"
import {logout} from "../../../slices/authSlice"
import { useDispatch, useSelector } from 'react-redux'
import { SidebarLink } from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'
import confirmmodal from '../../common/confirmmodal'
const Sidebar = () => {
    console.log("Insdide sidebar")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmmodal,setConfirmmodal] = useState(null);
    const {user,loading:profileloading} = useSelector((state) => state.profile)
    const {loading:authloading} = useSelector((state) => state.auth);
    if(profileloading || authloading){
        return (
            <div className='text-white font-bold text-3xl'>Loading...</div>
    )
  

    }
  return (
    <div className='flex w-[15%] text-white mt-[4rem] flex-col border-r-2 border-r-richblack-700 h-[calc(100vh-5rem)] '>
    <div className='flex flex-col'>
        {sidebarlinks.map((link) => {
            if (link.type && user?.accountType !== link.type) {
                return null;
            }
            return (
                <SidebarLink key={link.id} link={link} iconName={link.icon} />
            )
        })}
    </div>

    <div className='flex flex-col'>
                <button onClick={() => setConfirmmodal({
                    text1: "Are you sure",
                    text2: "You will be logged out",
                    btnText1: "Logout",
                    btnText2: "Cancel",
                    btn1Handler: () => dispatch(logout()),
                    btn2Handler: () => setConfirmmodal(null)
                })} className='font-medium text-richblack-700'>
                    <div className='flex items-center gap-2'>
                        <VscSignOut />
                        <span>Logout</span>
                    </div>
                </button>
            </div>

            {confirmmodal && <confirmmodal modalData={confirmmodal} />}
        </div>
  )
}

export default Sidebar