import React from 'react'
import { useSelector } from 'react-redux'
import CourseInformation from './CourseInformation'
import { FaCheck } from 'react-icons/fa'
import CourseBuilder from './CourseBuilder'
import PublishCourse from './PublishCourse'
const RenderSteps = () => {
  const { step } = useSelector(state => state.course)
  const steps = [
    { id: 1, title: "Course Information" },
    { id: 2, title: "Course Builder" },
    { id: 3, title: "Publisher" },
  ]

  return (
    <div>
      <div  className='pt-6 flex justify-center items-center  '>
        {steps.map((item) => (
          <div key={item.id} >
            <div className={`${step === item.id ? "bg-violet-300 border-violet-700" : "bg-richblack-100 border-richblack-700"} rounded-full border-2 w-10 h-10 flex items-center justify-center` }>
              {step > item.id ? <FaCheck /> : item.id}
            </div>
            <div>{item.title}</div>
          </div>
        ))}
      </div>
      {/* // if step 1 is done then step will be updated to 2 so at that time 2 > 1 so it will be checked 2 not greater than 2 so it wiil be number */}
     {step === 1 && <CourseInformation />} 
     {step === 2 && <CourseBuilder/>} 
     {step === 3 && <PublishCourse/>} 
      
    </div>
  )
}

export default RenderSteps
