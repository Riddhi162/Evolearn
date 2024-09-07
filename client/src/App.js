import React from 'react'
import {Route,Routes} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Settings from "./components/core/DashBoard/Settings.jsx"
import"./App.css"
import Navbar from './components/common/Navbar.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import UpdatePassword from './pages/UpdatePassword.js'
import VerifyEmail from './pages/VerifyEmail.jsx'
import Aboutus from './pages/Aboutus.jsx'
import MyProfile from './components/core/DashBoard/MyProfile.jsx'
import Dashboard from './pages/Dashboard.jsx'
import PrivateRoute from './components/core/Auth/PrivateRoute.jsx'
import MyCourses from './components/core/DashBoard/MyCourses.jsx'
import Cart from "./components/core/DashBoard/Cart.jsx"
import AddCourse from './components/core/DashBoard/AddCourse.jsx'
import { ACCOUNT_TYPE } from './constants.js'
import { useSelector } from 'react-redux'
import Catalog from "./pages/Catalog.jsx"
import CourseDetails from './pages/CourseDetails.jsx'
import EnrolledCourse from './components/core/DashBoard/EnrolledCourse.jsx'
import ViewCourse from './pages/ViewCourse.jsx'
import { VideoDetails } from './components/core/ViewCourse/VideoDetails.jsx'
const App = () => {
  const user = useSelector(state => state.profile )
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
     <Navbar/>
      <Routes>
      
         <Route path="/" element={<Home/>} />   
         <Route path="/catalog/:catalogName" element={<Catalog/>} />  
          
         <Route path="courses/:courseId" element={<CourseDetails />} />
         <Route path="/login" element={<Login/>} />   
         <Route path="/signup" element={<SignUp/>} />   
         <Route path="/forgot-password" element={<ForgotPassword/>} />   
         <Route path="/update-password/:id" element={<UpdatePassword/>} />   
         <Route path="/verify-email" element={<VerifyEmail/>} />   
         <Route path="/aboutus" element={<Aboutus/>} />   
         <Route element={<PrivateRoute>  
          <Dashboard />
          </PrivateRoute >}>
          <Route path="dashboard/my-profile" element={<MyProfile/>} /> 
        <Route path="dashboard/settings" element={<Settings/>} />
          
          <Route path="dashboard/my-courses" element={<MyCourses/>} />    
          <Route path="dashboard/purchase-history" element={<Cart/>} />    
          <Route path="dashboard/add-courses" element={<AddCourse/>} />    
          <Route path="dashboard/enrolled-course" element={<EnrolledCourse/>} />    
          
        

{
  user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
    <>
    <Route path="dashboard/add-courses" element={<AddCourse/>} /> </>
  )
}

{
  user?.accountType === ACCOUNT_TYPE.STUDENT && (
    <>
    <Route path="dashboard/enrolled-course" element={<EnrolledCourse/>} /> </>
  )
}



</Route>
        <Route
        path='view-course/:courseId/section/:sectionId/sub-section/:subSectionId'
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path=""
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>
       
      </Routes>
    </div>
  )
}

export default App