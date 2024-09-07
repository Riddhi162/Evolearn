// import { useEffect } from "react"
// import { useForm } from "react-hook-form"
// import { RxCross2 } from "react-icons/rx"
// import ReactStars from "react-rating-stars-component"
// import { useSelector } from "react-redux"

// import  createRating  from "../../../services/operations/courseDetailsAPI"
// import IconBtn from "../../common/IconBtn"

// const CourseReviewModal = ({setReviewModal}) => {
//     const { user } = useSelector((state) => state.profile)
//   const { token } = useSelector((state) => state.auth)
//   const { courseEntireData } = useSelector((state) => state.viewCourse)
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm()


//   useEffect(()=>{
//     setValue("courseExperience","");
//     setValue("courseRating",0);
//   })

//   const ratingChanged = (newRating) =>{
//     setValue("courserating",newRating)
//   } 
//   const onsubmit = async(data) =>{
//     await createRating({courseId:courseEntireData.courseId,rating:data.courseRating,review:data.courseExperience},token)
//     setReviewModal(false)
//   } 
//   return (
//     <div>
//         <div>
//             <div></div>

//             {/* modal bodyyy */}
//             <div className="p-6">
//           <div className="flex items-center justify-center gap-x-4">
//           <div className="">
//               <p className="font-semibold text-richblack-5">
//                 {user?.firstName} {user?.lastName}
//               </p>
//               <p className="text-sm text-richblack-5">Posting Publicly</p>
//             </div>
//             </div>

// {/* rating part */}
// <form action="" onSubmit={handleSubmit(onsubmit)}>

//     <ReactStars
//      count={5}
//      onChange={ratingChanged}
//      size={24}
//      activeColor="#ffd700"/>
//       <div className="flex w-11/12 flex-col space-y-2">
//               <label
//                 className="text-sm text-richblack-5"
//                 htmlFor="courseExperience"
//               >
//                 Add Your Experience <sup className="text-pink-200">*</sup>
//               </label>
//               <textarea
//                 id="courseExperience"
//                 placeholder="Add Your Experience"
//                 {...register("courseExperience", { required: true })}
//                 className="form-style resize-x-none min-h-[130px] w-full"
//               />
//               {errors.courseExperience && (
//                 <span className="ml-2 text-xs tracking-wide text-pink-200">
//                   Please Add Your Experience
//                 </span>
//               )}
//             </div>

//             <div className="mt-6 flex w-11/12 justify-end gap-x-2">
//               <button
//                 onClick={() => setReviewModal(false)}
//                 className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
//               >
//                 Cancel
//               </button>
//               <IconBtn text="Save" type="submit"/>
//             </div>
// </form>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default CourseReviewModal