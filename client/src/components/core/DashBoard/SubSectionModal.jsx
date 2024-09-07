import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"
import { setCourse } from "../../../slices/courseSlice"
import { createSubSection, updateSubSection } from "../../../services/operations/courseApi"
import IconBtn from "../../common/IconBtn"
import Upload from "./Upload"
const SubSectionModal = ( {modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,}) => {
        const {
            register,
            handleSubmit,
            setValue,
            formState: { errors },
            getValues,
          } = useForm()
          const dispatch = useDispatch()
          const [loading, setLoading] = useState(false)
          const { token } = useSelector((state) => state.auth)
          const { course } = useSelector((state) => state.course)


          useEffect(() => {
            if (view || edit) {
              setValue("lectureTitle", modalData.title)
              setValue("lectureDesc", modalData.description)
              setValue("lectureVideo", modalData.videoUrl)
            }
          }, [])
          const handleEditSubsection = async () => {
            const currentValues = getValues()
            const formData = new FormData()
            //while editing we passed subsection data and secction id
            formData.append("sectionId",modalData.sectionId);
            formData.append("subSectionId",modalData._id);
            //any of the field that will be changed will be appended to the data
            if (currentValues.lectureTitle !== modalData.title) {
                formData.append("title", currentValues.lectureTitle)
              }
              if (currentValues.lectureDesc !== modalData.description) {
                formData.append("description", currentValues.lectureDesc)
              }
              if (currentValues.lectureVideo !== modalData.videoUrl) {
                formData.append("video", currentValues.lectureVideo)
              }
              setLoading(true);
              const result = await updateSubSection(formData, token)
              if (result) {
                // const updatedCourseContent = course.courseContent.map((section) =>
                //   section._id === modalData.sectionId ? result : section
                // )
                // const updatedCourse = { ...course, courseContent: updatedCourseContent }
                const updatedCourseContent = course.courseContent.map((section)=>(
                  section._id == modalData.sectionId ? result :section
                ))
                const updatedCourse = {...course,courseContent:updatedCourseContent}
                  dispatch(setCourse(updatedCourse))
              }
              setModalData(null)
              setLoading(false)
              }
              
        
          const isFormUpdated = () => {
            const currentValues = getValues();
            if(currentValues.lectureTitle != modalData.title || currentValues.lectureDesc !== modalData.description ||
                currentValues.lectureVideo !== modalData.videoUrl) {
                    return true;
                }
                else{return false;}
          }


          const onSubmit = async(data) => {
            if(view){
                return;
            }
            if (edit) {
                if (!isFormUpdated()) {
                  toast.error("No changes made so the form")
                } else {
                  handleEditSubsection()
                }
                return;
          }
          const formData = new FormData();//we will create a new form data object where we will have all the things of form
          formData.append("sectionId", modalData)//if it will be add we will have the section id which we have paased to which we are adding here we used.sectionId since modalData is an object while is a string so
          formData.append("title", data.lectureTitle)
          formData.append("description", data.lectureDesc)
          console.log("inside subsecmod",modalData)
          formData.append("video", data.lectureVideo)
          console.log(modalData);
          setLoading(true)
          //now we call the api for adding subsection
          const result = await createSubSection(formData,token);
          if(result){
            const updatedCourseContent = course.courseContent.map((section)=>
              section._id == modalData ? result :section
            )
            const updatedCourse = {...course,courseContent:updatedCourseContent}
              dispatch(setCourse(updatedCourse))
          }
          setModalData(null)
          setLoading(false)
        }
  return (
    <div>
         <div className="mt-20  w-[40%] backdrop-blur-2xl min-h-[80vh] max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800 absolute top-0 left-[35%]" >
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
          </div>

          <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2 px-8 py-10"
        >
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />
               <div className="flex flex-col space-y-1">
            <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
              Lecture Title {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <input
              disabled={view || loading}
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="form-style w-full !pl-12 bg-richblack-100/25 p-2 rounded-lg"
            />
            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture title is required
              </span>
            )}
          </div>


          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
              Lecture Description{" "}
              {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <textarea
              disabled={view || loading}
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", { required: true })}
              className="form-style w-full !pl-12 bg-richblack-100/25 p-2 rounded-lg"
            />
            {errors.lectureDesc && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture Description is required
              </span>
            )}
          </div>

          {!view && (
            <div className="flex justify-end">
              <IconBtn
              type="submit"
                disabled={loading}
                text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
              />
            </div>
          )}
        </form>
          </div>
    </div>
  )
}

export default SubSectionModal