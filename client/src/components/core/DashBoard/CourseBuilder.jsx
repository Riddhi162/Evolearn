import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import IconBtn from '../../common/IconBtn'
import { IoAdd } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setEditCourse, setStep, setCourse } from '../../../slices/courseSlice';
import { setLoading } from '../../../slices/authSlice';
import { createSection, updateSection } from '../../../services/operations/courseApi';
import { toast } from 'react-hot-toast'
import Nestedview from './Nestedview';

const CourseBuilder = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const { token } = useSelector((state) => state.auth)
  const [editSectionName, setEditSectionName] = useState(null)
  const { course = { courseContent: [] } } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  }

  const goBack = () => {
    dispatch(setEditCourse(true)) 
    dispatch(setStep(1));
  }

  const goToNext = () => {
    if (!course || !course.courseContent || course.courseContent.length === 0) {
      toast("Add at least one section");
      return;
    }
    if (course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add at least one lecture in each section");
      return;
    }
    dispatch(setStep(3));
  }

  const onSubmit = async (data) => {
    console.log(course.courseContent.length)
    setLoading(true);
    let result; 
    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        }, token
      )
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        }, token
      )
    }

    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }
    setLoading(false);
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
    } else {
      setEditSectionName(sectionId);
      setValue("sectionName", sectionName);
    }
  }

  return (
    <div className='text-richblack-100 flex flex-col justify-center items-center pb-20'>
     <div className='bg-richblack-900 p-6 rounded-lg shadow-md text-richblack-100 w-[50%]'>
  <p className='text-2xl font-semibold mb-6'>Course Builder</p>
  <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
    <div>
      <label htmlFor="sectionName" className='block text-lg font-medium mb-2'>
        Section Name
      </label>
      <input 
        type="text" 
        id='sectionName' 
        placeholder='Add section' 
        {...register("sectionName", { required: true })} 
        className='w-full p-3 rounded-lg border border-richblack-700 bg-richblack-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500' 
      />
      {errors.sectionName && (
        <span className="ml-2 text-sm tracking-wide text-pink-200">
          Section name is required
        </span>
      )}
    </div>

    <div className='flex gap-4 items-center'>
      <IconBtn 
        type='submit' 
        text={editSectionName ? "Edit Section" : "Create Section"} 
        outline={true} 
        customClasses='text-violet-300 bg-richblack-700 hover:bg-violet-600 px-4 py-2 rounded-md'
      />
      <IoAdd className='text-violet-300 text-lg' />
      {editSectionName && (
        <IconBtn 
          onClick={cancelEdit} 
          type='button' 
          text="Cancel Edit"  
          customClasses='text-pink-300 bg-richblack-700 hover:bg-pink-600 px-4 py-2 rounded-md'
        />
      )}
    </div>
  </form>
</div>


      {course?.courseContent?.length > 0 && (
       
        <Nestedview handleChangeEditSectionName={handleChangeEditSectionName}/>
      )}

      <div className='flex gap-5'>
        <button onClick={goBack} className='text-violet-300 bg-richblack-700 hover:bg-violet-300 hover:text-violet-900 px-4 py-2 rounded-md'>back</button>
        <IconBtn text="next" onClick={goToNext} customClasses='text-violet-300 bg-richblack-700 hover:bg-violet-300 hover:text-violet-900 px-4 py-2 rounded-md' />
      </div>
    </div>
  )
}

export default CourseBuilder
