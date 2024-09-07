import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import IconBtn from '../../common/IconBtn'
import { IoAdd } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setEditCourse, setStep, setCourse,resetCourseState } from '../../../slices/courseSlice';
import { setLoading } from '../../../slices/authSlice';
import { createSection, editCourseDetails, updateSection } from '../../../services/operations/courseApi';
import { toast } from 'react-hot-toast'
import Nestedview from './Nestedview';
import { COURSE_STATUS } from '../../../constants';
import { useNavigate } from "react-router-dom"
const PublishCourse = () => {
    const { register, handleSubmit, setValue, getValues } = useForm()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useSelector((state) => state.auth)
    const { course } = useSelector((state) => state.course)
    const [loading, setLoading] = useState(false)
  
    useEffect(() => {
      if (course?.status === COURSE_STATUS.PUBLISHED) {
        setValue("public", true)
      }
    }, [])
  
    const goBack = () => {
      dispatch(setStep(2))
    }
  
    const goToCourses = () => {
      dispatch(resetCourseState())
      navigate("/dashboard/my-courses")
    }
  
    const handleCoursePublish = async () => {
      // check if form has been updated or not
      if (
        (course?.status === COURSE_STATUS.PUBLISHED &&
          getValues("public") === true) ||
        (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
      ) {
        // form has not been updated
        // no need to make api call
        goToCourses()
        return
      }
      const formData = new FormData()
      formData.append("courseId", course._id)
      const courseStatus = getValues("public")
        ? COURSE_STATUS.PUBLISHED
        : COURSE_STATUS.DRAFT
      formData.append("status", courseStatus)
      setLoading(true)
      const result = await editCourseDetails(formData, token)
      if (result) {
        goToCourses()
      }
      setLoading(false)
    }
  
    const onSubmit = (data) => {
      // console.log(data)
      handleCoursePublish()
    }
  
    return (
      <div className='flex justify-center items-center'>
      <div className="rounded-lg border border-richblack-700 bg-richblack-800 p-6 shadow-lg w-[60%]">
  <p className="text-3xl font-bold text-richblack-5 mb-6">
    Publish Settings
  </p>
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    {/* Checkbox */}
    <div>
      <label htmlFor="public" className="inline-flex items-center text-lg">
        <input
          type="checkbox"
          id="public"
          {...register("public")}
          className="h-5 w-5 rounded bg-richblack-500 text-richblack-400 border-gray-300 focus:ring-2 focus:ring-richblack-5"
        />
        <span className="ml-3 text-richblack-100">
          Make this course public
        </span>
      </label>
    </div>

    {/* Next Prev Button */}
    <div className="flex justify-end gap-x-4">
      <button
        disabled={loading}
        type="button"
        onClick={goBack}
        className="bg-richblack-300 text-richblack-100 py-2 px-4 rounded-lg font-semibold shadow-md hover:bg-richblack-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Back
      </button>
      <IconBtn
        disabled={loading}
        text="Save Changes"
        type="submit"
        customClasses="bg-violet-500 text-white py-2 px-4 rounded-lg font-semibold shadow-md hover:bg-violet-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      />
    </div>
  </form>
</div>
</div>
    )
}

export default PublishCourse