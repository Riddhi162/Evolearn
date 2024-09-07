import React from 'react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import {Swiper,SwiperSlide} from "swiper/react"
import { FreeMode, Pagination, Autoplay, Navigation } from 'swiper/modules';
import CourseCard from './CourseCard'
const CourseSlider = ({Courses}) => {

  return (
    <div>
        {
            Courses?.length ? (
                <Swiper    slidesPerView={1}
                spaceBetween={25}
                loop={true}
                modules={[FreeMode, Pagination, Autoplay, Navigation]}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                navigation
                pagination={{ clickable: true }}
                freeMode={true}
                breakpoints={{
                  1024: {
                    slidesPerView: 3,
                  },
                }}
                className="max-h-[30rem]">
                    {
                        Courses?.map((course,index)=>(
                            <SwiperSlide key={index} className='bg-richblack-25/10 rounded-lg '>
                                <CourseCard course={course} Height={"h-[200px]"}/>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            ):(<p>No course found</p>)
        }
    </div>
  )
}

export default CourseSlider