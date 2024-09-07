import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../common/IconBtn";
import { IoAdd } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setEditCourse, setStep, setCourse } from "../../../slices/courseSlice";
import { setLoading } from "../../../slices/authSlice";
import {
  createSection,
  deleteSection,
  deleteSubSection,
  updateSection,
} from "../../../services/operations/courseApi";
import { toast } from "react-hot-toast";
import confirmmodal from "../../common/confirmmodal";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { RxDropdownMenu } from "react-icons/rx";
import { IoMdArrowDropdown } from "react-icons/io";
import SubSectionModal from "./SubSectionModal";
import ConfirmModal2 from "../../common/confirmmodal";
const Nestedview = ({ handleChangeEditSectionName }) => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const { course } = useSelector((state) => state.course);
 useEffect(()=>{
  console.log(course.courseContent)
 },[course])
  const handleDeleteSection = async(sectionId) => {
    console.log("inside section deletion nested view");
    const result = await deleteSection(
      {  sectionId,
        courseId:course._id,
        token}

    )
    console.log("Result",result)
    if(result){
        dispatch(setCourse(result))
    }
    setConfirmationModal(null);
  };

  const handleDeleteSubSection = async(subSectionId,sectionId) => {
    console.log("inside subsection deletion nested view");
    const result = await deleteSubSection(
        {  
          subSectionId,
          sectionId,
          token}
  
      )
      if(result){
        const updatedCourseContent = course.courseContent.map((section)=>(
          section._id == sectionId ? result :section
        ))
        const updatedCourse = {...course,courseContent:updatedCourseContent}
          dispatch(setCourse(updatedCourse))
      }
      setConfirmationModal(null);
  };
  return (
    <div className="w-full flex justify-center items-center p-6 ">
    <div
      className="rounded-lg bg-richblack-700 p-6 px-8 w-full max-w-4xl shadow-lg"
      id="nestedViewContainer"
    >
      {course?.courseContent?.map((section) => (
        <details key={section._id} open className="mb-4">
          <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-3 bg-richblack-600 rounded-lg">
            <div className="flex items-center gap-4">
              <RxDropdownMenu className="text-violet-400" />
              <p className="text-lg font-semibold text-richblack-100">{section.sectionName}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                  className="text-violet-400 hover:text-violet-300"
                >
                  <MdEdit className="text-lg" />
                </button>
                <button
                  onClick={() => {
                    setConfirmationModal({
                      text1: "delete",
                      text2: "all the sections will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    });
                  }}
                  className="text-red-400 hover:text-red-300"
                >
                  <MdDelete className="text-lg" />
                </button>
                <span className="text-richblack-200">|</span>
                <button>
                  <IoMdArrowDropdown className="text-violet-400" />
                </button>
              </div>
            </div>
          </summary>
  
          <div className="pl-6 pt-2">
            {section.subSection.map((data) => (
              <div
                key={data?.id}
                onClick={() => setViewSubSection(data)}
                className="flex items-center justify-between py-2 px-4 border-b border-b-richblack-600 bg-richblack-800 rounded-lg mb-2"
              >
                <div className="flex items-center gap-4">
                  <RxDropdownMenu className="text-violet-400" />
                  <p className="text-md font-medium text-richblack-100">{data.title}</p>
                </div>
  
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() =>
                      setEditSubSection({ ...data, sectionId: section._id })
                    }
                    className="text-violet-400 hover:text-violet-300"
                  >
                    <MdEdit className="text-md" />
                  </button>
                  <button
                    onClick={() => {
                      setConfirmationModal({
                        text1: "delete this subsection",
                        text2: "all the subsection will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () =>
                          handleDeleteSubSection(data._id, section._id),
                        btn2Handler: () => setConfirmationModal(null),
                      });
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    <MdDelete className="text-md" />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => setAddSubSection(section._id)}
              className="mt-4 bg-violet-500 text-white py-2 px-4 rounded-lg hover:bg-violet-400"
            >
              Add Lecture
            </button>
          </div>
        </details>
      ))}
    </div>
  
    {addSubSection ? (
      <SubSectionModal 
        modalData={addSubSection}
        setModalData={setAddSubSection}
        add={true}
      />
    ) : viewSubSection ? (
      <SubSectionModal
        modalData={viewSubSection}
        setModalData={setViewSubSection}
        view={true}
      />
    ) : editSubSection ? (
      <SubSectionModal
        modalData={editSubSection}
        setModalData={setEditSubSection}
        edit={true}
      />
    ) : (
      <div></div>
    )}
  
    {confirmationModal ? (
      <ConfirmModal2
        modalData={confirmationModal}
      />
    ) : (
      <></>
    )}
  </div>
  
  );
};

export default Nestedview;
