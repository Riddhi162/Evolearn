import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {fetchInstructorCourses} from "../../../services/operations/courseApi"
import CourseTable from './CourseTable'
import { useSelector } from 'react-redux'
const MyCourses = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [courses,setCourses] = useState([])
  const { token } = useSelector((state) => state.auth)
  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
  }, [])
  
  return (
    <div className='w-[100%] flex items-center justify-center flex-col '>
         <p className='text-4xl font-bold text-violet-300 mb-10 text-center'>Instructor Courses</p>
         {
          courses && (<CourseTable courses={courses} setCourses={setCourses}/>)
         }
    </div>
  )
}

export default MyCourses