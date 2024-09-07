import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import vid from "../assests/3D Book - Google Chrome 2024-07-10 15-37-39.mp4";
import CTAButton from "../components/core/Homepage/Button.jsx";
import CodeBlocks from "../components/core/Homepage/CodeBlocks.jsx";
import Timeline from "../components/core/Homepage/Timeline.jsx"
import LearningSection from "../components/core/Homepage/LearningSection.jsx"
import logo1 from "../assests/Evol-removebg-preview.png"
import instructor from "../assests/instructor.png"
const Home = () => {
  return (
    <div className="">
      <div className="relative mx-auto flex flex-col w-11/12 items-center max-w-maxContent text-white justify-between gap-5">
        <Link to="/signup">
          <div className="font-bold bg-richblack-800 text-richblack-200 mx-aut mt-20 p-3 rounded-full flex justify-between gap-3 items-center">
            <span>Become an instructor</span>
            <FaArrowRight />
          </div>
        </Link>

        <div className="text-violet-400 font-bold text-4xl mt-8">
          Empower your future with coding skills
        </div>

        <p className="text-richblack-200 text-center text-lg mt-8">
        Discover a world of learning opportunities with our diverse range of courses. Whether you’re looking to develop new skills or deepen existing knowledge, our platform provides engaging content tailored to your needs. Explore subjects at your own pace and enjoy interactive lessons designed to help you succeed.
        </p>
         
        <div className="text-richblack-200 text-center text-lg mt-8 flex gap-24 ">
          <CTAButton active={true} linkto="/signup">
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto="/login">
            Book demo
          </CTAButton>
        </div> 

        <div className="w-[500px] h-72 mt-10">
        <video muted loop autoPlay>
          <source src={vid} type="video/mp4" />
        </video>
      </div>


      <div>
        <CodeBlocks
          position={"lg:flex-row"}
          heading={
            <div className="text-3xl font-semibold">
              Unlock your coding potential.
            </div>
          }
          subheading={"You will love all our courses every time"}
          ctabtn1={{ btnText: "Try courses", linkto: "/signup", active: true }}
          ctabtn2={{ btnText: "Learn more", linkto: "/login", active: false }}
          codeblock={
            `balle\nbale sshava havaddbeu\nsbioddljf s dfujewh3erfdsq\n wertyu\nweghfjuiuutrgfeads\ntyhgfdswe`
          }
          codeColor="text-richblack-200"
        />
      </div>

     
      
       </div>
    {/* setion 2 */}
      
      <Timeline/>
      <LearningSection/> 

      {/* section 3 */}
       <div className=" mx-auto bg-richblack-800/75 max-w-maxContent flex flex-col items-center justify-center gap-20  text-white py-20">

          <div className="flex flex-row justify-center items-center gap-20  ">
            <img src={instructor} alt="" className=" h-[450px] w-[480px]" />
            <div className="text-center lg:text-left w-full lg:w-1/2">
          <h2 className="text-3xl font-bold text-violet-400 mb-4">
            How to Become an Instructor and Its Perks
          </h2>
          <p className="text-richblack-300 mb-4">
            Becoming an instructor is not only a fulfilling career choice but also a chance to shape the future of learners. If you have a passion for sharing knowledge and a desire to inspire others, here's a guide on how you can embark on this rewarding journey and the numerous benefits it brings.
          </p>
          <p className="text-richblack-300 mb-4">
            To start your journey as an instructor, you need to focus on several key areas:
          </p>
          <ul className="list-disc list-inside text-richblack-300 mb-4">
            <li className="mb-2">Educational Background: Acquire the necessary educational qualifications relevant to the subject you wish to teach.</li>
            <li className="mb-2">Certifications and Training: Depending on the field and the institution, certifications or specialized training may be required.</li>
            <li className="mb-2">Experience: Gaining experience in your field is crucial. Practical experience enriches your teaching and enhances your credibility.</li>
            <li className="mb-2">Develop Teaching Skills: Effective communication, patience, and engagement are key traits of a successful instructor.</li>
          </ul>
          <p className="text-richblack-300">
            Embrace the opportunity to share your expertise and make a significant impact on learners' lives.
          </p>
        </div>
          </div>
          <CTAButton active={true} linkto={"/signup"}>
              <div>
                 Become an instructor
              </div>
            </CTAButton>
       </div>

    </div>
  );
};

export default Home;
