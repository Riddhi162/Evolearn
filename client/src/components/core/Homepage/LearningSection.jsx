import React from "react";
import logo1 from "../../../assests/Evol-removebg-preview.png";

const LearningSection = () => {
  return (
    <div className="bg-richblack-800/40 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-4xl font-bold text-violet-400 mb-6">
          Expand Your Knowledge with Us
        </h2>
        <p className="text-center text-lg text-richblack-25 mb-12">
          Discover a world of learning opportunities with our diverse range of courses. Whether you’re looking to develop new skills or deepen existing knowledge, our platform provides engaging content tailored to your needs. Explore subjects at your own pace and enjoy interactive lessons designed to help you succeed.
        </p>
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
          <div className="w-full lg:w-1/2 flex flex-col gap-6 items-center">
            <img
              src={logo1}
              alt="Learning Icon"
              className="w-20 h-20 mx-auto"
            />
            <img
              src={logo1}
              alt="Learning Icon"
              className="w-20 h-20 mx-auto"
            />
            <img
              src={logo1}
              alt="Learning Icon"
              className="w-20 h-20 mx-auto"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-5 items-center">
            <img
              src={logo1}
              alt="Platform Overview"
              className="w-32 h-32 mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold text-violet-400 mb-0">
              Why Choose Our Platform?
            </h3>
            <p className="text-richblack-25 text-center">
              Our platform offers personalized learning experiences, interactive lessons, and expert guidance to help you master new skills efficiently. Whether you're a beginner or looking to advance, we provide the tools and support you need to achieve your goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningSection;
