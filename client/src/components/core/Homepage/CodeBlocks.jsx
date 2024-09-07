import React from 'react';
import CTAButton from "./Button";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({ position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor }) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
      <div className='w-[50%] text-violet-400 flex flex-col gap-8'>
        {heading}
        <div className='text-richblack-200 font-bold'>
          {subheading}
        </div>

        <div className='flex gap-7 mt-7'>
          <CTAButton linkto={ctabtn1.linkto} active={ctabtn1.active}>
            {ctabtn1.btnText}
          </CTAButton>

          <CTAButton linkto={ctabtn2.linkto} active={ctabtn2.active}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      <div className='h-fit flex flex-roww w-[100%] '>
        <div className='text-center flex flex-col w-[10%] text-richblack-200 font-inter font-bold'>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
        </div>
        <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
          <TypeAnimation
            sequence={[codeblock, 5000, ""]}
            repeat={Infinity}
            cursor={true}
            style={
                {whiteSpace:"pre-line",display:"block"}
            }
          />
        </div>
      </div>
    </div>
  );
}

export default CodeBlocks;
