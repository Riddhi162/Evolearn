import React from "react";
import logo1 from "../../../assests/t1.png";
import timelineImg from "../../../assests/learning.png";

const TimelineObj = [
  {
    logo: logo1,
    heading: "Expert Guidance",
    description: "Personalized support from industry experts tailored to your goals.",
  },
  {
    logo: logo1,
    heading: "Learning Pathways",
    description: "Unlock your potential with our structured learning paths.",
  },
  {
    logo: logo1,
    heading: "Innovative Curriculum",
    description: "Engage with cutting-edge materials and hands-on projects.",
  },
  {
    logo: logo1,
    heading: "Flexible Scheduling",
    description: "Learn at your own pace with customizable course options.",
  },
];

const Timeline = () => {
  return (
    <div className="bg-richblack-800/20 pt-10">
      <h2 className="text-center text-4xl font-bold text-violet-400 mb-12">Get to Learn with Us</h2>
      <div className="flex flex-col lg:flex-row gap-16 py-10 items-start justify-center mx-auto max-w-7xl">

        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          {TimelineObj.map((element, index) => {
            return (
              <div key={index} className="flex flex-row gap-6 items-start border-b border-richblack-200 pb-6">
                <div className="w-[60px] h-[60px] flex items-center justify-center rounded-full">
                  <img src={element.logo} alt={element.heading} className="w-24 h-24" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-violet-400 mb-2">{element.heading}</h3>
                  <p className="text-richblack-5">{element.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <img src={timelineImg} alt="Timeline Illustration" className="h-auto max-w-full" />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
