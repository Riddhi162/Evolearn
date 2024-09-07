import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import "video-react/dist/video-react.css";
import { useLocation } from "react-router-dom";
import { BigPlayButton, Player } from "video-react";

import { markLectureAsComplete } from "../../../services/operations/courseApi";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import IconBtn from "../../common/IconBtn";

export const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData.length) {
        return;
      }
      if (!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        );
        const filteredVideoData = filteredData?.[0].subSectionfilter(
          (course) => course._id === subSectionId
        );
        setVideoData(filteredVideoData[0]);
        setVideoEnded(false);
      }
    };
    setVideoSpecificDetails();
  });

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (course) => course._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  };
  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (course) => course._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);
    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length();

    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1
    ) {
      return true;
    } else {
      return false;
    }
  };
  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (course) => course._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);
    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length();
    if (currentSubSectionIndex != 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength =
        courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndex - 1].subSection[
          prevSubSectionLength - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };
  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (course) => course._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);
    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length();
    if (currentSubSectionIndex != noOfSubSections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex + 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };
  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete(
      { courseId: courseId, subSectionId: subSectionId },
      token
    );
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };
  return (
    <div className="flex flex-col gap-5 text-white bg-pink-300">
      {!videoData ? (
        <div>no video data</div>
      ) : (
        <Player>
          ref={playerRef}
          aspectRatio="16:9" playsInline onEnded={() => setVideoEnded(true)}
          src={videoData?.videoUrl}
       
         <BigPlayButton position="center" />
        {
            videoEnded && (
                <div>
                    {
                        //jab koi video completed nai hui hogi tabhi dikkhayenge  so not includes
                        !completedLectures.include(subSectionId) && (
                            <IconBtn
                            disabled={loading}
                            onclick={() => handleLectureCompletion()}
                            text={!loading ? "Mark As Completed" : "Loading..."}
                            customClasses="text-xl max-w-max px-4 mx-auto"
                          />
                        )
                    }

                <IconBtn
                disabled={loading}
                onclick={() => {
                  if (playerRef?.current) {
                    // set the current time of the video to 0
                    playerRef?.current?.seek(0)
                    setVideoEnded(false)
                  }
                }}
                text="Rewatch"
                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
              />

<div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
{/* //only visible if its not a first video */}
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="blackButton"
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="blackButton"
                  >
                    Next
                  </button>
                )}
              </div>
                </div>
            )
        }
        </Player>
      )}
    </div>
  );
};
