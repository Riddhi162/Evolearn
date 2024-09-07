import React, { useEffect, useState } from 'react'
import GetAvgRating from "../../../constants"
import RatingStars from "../../../constants"
import { Link } from 'react-router-dom'
const CourseCard = ({course,Height}) => {
    const [avgReviewCount,setAvgReviewcount]= useState(0);

    useEffect(()=>{
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewcount(count);
    },[course])
  return (
    <div>
      
      <Link to={`/courses/${course._id}`}>
        <div className="">
          <div className="rounded-lg bg-richblack-25 w-[400px]">
            <img
              src={course?.thumbnail}
              alt="course thumnail"
              className={`${Height} w-full rounded-xl object-cover `}
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
            <p className="text-[22px] text-violet-400 font-semibold ">{course?.courseName}</p>
            <p className="text-md text-richblack-100">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-300">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-richblack-400 text-orange-400">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>
            <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>

  
    </div>
  )
}

export default CourseCard