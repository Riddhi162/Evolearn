import { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUserEnrolledCourses } from "../../../services/operations/authApi";

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async () => {
    try {
      const courses = user.courses;
      const res = await getUserEnrolledCourses(courses, token);
      setEnrolledCourses(res);
      console.log("enrolledc",res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.");
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <>
      <div className="text-4xl font-bold text-violet-300 mb-10 text-center">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-violet-100">
          You have not enrolled in any course yet.
        </p>
      ) : (
        <div className="mx-32 text-violet-100 ">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-richblack-700">
            <p className="w-[45%] px-5 py-4 text-lg font-semibold">Course Name</p>
            <p className="w-1/4 px-4 py-4 text-lg font-semibold">Duration</p>
            <p className="flex-1 px-4 py-4 text-lg font-semibold">Progress</p>
          </div>
          {/* Course List */}
          {enrolledCourses.map((course, i, arr) => (
            <div key={i} className="mb-6">
              <div
                className={`flex items-center   h-[200px] bg-richblack-100/10 rounded-lg shadow-lg ${
                  i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                }`}
              >
                <div
                  className="flex w-[45%] cursor-pointer items-center gap-6 px-5 py-4"
                  onClick={() => {
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    );
                  }}
                >
                  <img
                    src={course.thumbnail}
                    alt="course_img"
                    className="h-36 w-64 rounded-lg object-cover border-2 border-violet-400"
                  />
                  <div className="flex max-w-xs flex-col gap-2 ">
                    <p className="font-bold text-lg text-violet-400">{course.courseName}</p>
                    <p className="text-sm text-violet-200">
                      {course.courseDescription.length > 50
                        ? `${course.courseDescription.slice(0, 50)}...`
                        : course.courseDescription}
                    </p>
                  </div>
                </div>
                <div className="w-1/4 px-4 py-4 text-lg text-violet-200">{course?.totalDuration}</div>
                <div className="flex w-1/5 flex-col gap-2 px-4 py-4">
                  <p className="text-sm text-violet-200">Progress: {course.progressPercentage || 0}%</p>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="10px"
                    isLabelVisible={false}
                    className="rounded-full bg-violet-300"
                    barContainerClassName="rounded-full"
                    baseBgColor="#6B46C1"
                    bgColor="#9F7AEA"
                  />
                </div>
              </div>
              {/* Divider */}
              {i !== arr.length - 1 && <hr className="border-violet-100 my-6" />}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
