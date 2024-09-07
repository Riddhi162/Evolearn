import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pagesAndComponetdetails';
import CourseCard from '../components/core/Catalog/CourseCard';
import CourseSlider from '../components/core/Catalog/CourseSlider';
const Catalog = () => {
    const {catalogName} = useParams();
    const [catalogPageData,setCatalogPageData] = useState(null);
    const [categoryId,setCategoryId] = useState();
    const [active, setActive] = useState(1);

    useEffect(()=>{
        const getCategories = async()=>{{
            const result = await apiConnector("GET",categories.CATEGORIES_API);
            const category_id = result?.data?.data.filter((c)=>c.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id) 
        }}
        getCategories();
    },[catalogName])

    useEffect(() => {
        const getCategoryPageDetails = async () => {
            if (!categoryId) return; // Only proceed if categoryId is defined
            try {
                console.log("Inside useEffect with categoryId:", categoryId);
                const res = await getCatalogPageData(categoryId);
                setCatalogPageData(res);
            } catch (error) {
                console.error("Error fetching catalog page data:", error);
            }
        };
        getCategoryPageDetails();
    }, [categoryId]); 

  return (
    <div>
           <div className=" box-content bg-richblack-800/20">
            <div className=" flex min-h-[260px] max-w-maxContentTab flex-col p-10 pt-20 justify-center gap-3 lg:max-w-maxContent bg-richblack-800">
              <p className="text-sm text-richblack-300 text-violet-200">
                {`Home / Catalog / `}
                <span className="text-yellow-25">
                   {catalogPageData?.data?.selectedCategory?.name} 
                </span>
              </p>
              <p className="text-[50px] text-violet-400 font-bold">
                {catalogPageData?.data?.selectedCategory?.name}
              </p>
              <p className="max-w-[870px] text-[20px] text-richblack-25">
                {catalogPageData?.data?.selectedCategory?.description}
              </p>
            </div>

            
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent bg-richblack-800/20">
            <div className="section_heading text-[37px] text-violet-300 font-semibold">Courses to get you started</div>
            <div className="my-4 flex border-b border-b-richblack-600 text-sm">
              <p
                className={`px-4 py-2 text-[20px] text-violet-300  ${
                  active === 1
                    ? " border-b-violet-500 text-yellow-25 border-b-4"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Popular
              </p>
              <p
                className={`px-4 py-2 text-[20px] text-richblack-25 ${
                  active === 2
                    ? "border-b-violet-500 text-yellow-25 border-b-4"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div>
            <div>
              <CourseSlider
                Courses={catalogPageData?.data?.selectedCategory?.courses}
              />
            </div>
          </div>


{/* all top sellers */}

          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent bg-richblack-800/40">
            <div className="section_heading text-[30px] text-violet-300 ">
              Top courses in {catalogPageData?.data?.differentCategory?.name}
            </div>
            <div className="py-8 ">
              <CourseSlider
                Courses={catalogPageData?.data?.differentCategory?.courses}
              />
            </div>
          </div>
    

   {/* frewuqnt courses */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent bg-richblack-800/50">
            <div className=" text-[30px] text-violet-300 ">Frequently Bought</div>
            <div className="py-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 ">
                {catalogPageData?.data?.mostSellingCourses
                  ?.slice(0, 4)
                  .map((course, i) => (
                    <CourseCard course={course} key={i} Height={"h-[400px]"} />
                  ))}
              </div>
            </div>
          </div>
          </div>
    </div>
  )
}

export default Catalog