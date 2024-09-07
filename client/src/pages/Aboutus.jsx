import React from 'react';
import abt1 from "../assests/abt1.png"
import abt2 from "../assests/umg2-removebg-preview.png"
import { useState } from 'react';
const Aboutus = () => {
    
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact:"",
    message:"",
  })
    function changeHandler(event) {
        setFormData((prev) => ({
          ...prev,
          [event.target.name]: event.target.value,
        }));
      }
  const services = [
    {
      image: abt1,
      alt: "Wheat flour grinding",
      title: "Wheat Flour Grinding",
      description: "Our wheat flour grinding service provides fresh, high-quality flour to businesses and individuals in the area. We use state-of-the-art equipment to grind wheat into flour, and we offer a variety of flours to meet the needs of our customers.",
    },
    {
      image: abt1,
      alt: "Gram Flour Grinding",
      title: "Gram Flour Grinding",
      description: "Our gram flour is perfect for a variety of uses, including baking, cooking, and making snacks. It is also a good source of protein and fiber. Our gram flour grinding service is a convenient and affordable way to get the freshest gram flour possible.",
    },
    {
      image:abt1,
      alt: "Jowar Flour Grinding",
      title: "Jowar Flour Grinding",
      description: "Our jowar grinding service is a convenient and affordable way to get fresh, high-quality jowar flour. We use state-of-the-art equipment to grind jowar into a fine powder, which is perfect for making roti, bread, and other dishes.",
      details: "Our jowar flour is also a good source of protein and fiber, making it a healthy choice for your family.",
    },
  ];

  const whyUs = [
    {
      image: "https://image3.jdomni.in/banner/13062021/58/97/7C/E53960D1295621EFCB5B13F335_1623567851299.png?output-format=webp",
      title: "Latest Milling Machinery",
    },
    {
      image: "https://image2.jdomni.in/banner/13062021/3E/57/E8/1D6E23DD7E12571705CAC761E7_1623567977295.png?output-format=webp",
      title: "Reasonable Rates",
    },
    {
      image: "https://image3.jdomni.in/banner/13062021/16/7E/7E/5A9920439E52EF309F27B43EEB_1623568010437.png?output-format=webp",
      title: "Time Efficiency",
    },
    {
      image: "https://image3.jdomni.in/banner/13062021/EB/99/EE/8B46027500E987A5142ECC1CE1_1623567959360.png?output-format=webp",
      title: "Expertise in Industry",
    },
  ];

  return (
    <div className='flex flex-col justify-center items-center pb-20'>
      {/* Home Section */}
      <div className="relative w-full h-[320px]" id="home">
        <div className="absolute inset-0 opacity-50 ">
          <img
            src="https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2019/10/23170101/List-of-Professional-Courses-after-Graduation.gif"
            alt="Background Image"
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div className="absolute w-[100%] backdrop-blur-sm pl-10 text-white  font-bold flex flex-col md:flex-row items-center justify-between h-full">
          <div className="md:w-1/2 mb-4 md:mb-0">
            <h1 className="text-grey-700 font-bold text-4xl md:text-6xl leading-tight mb-2">
              Study Notion
            </h1>
            <p className="font-regular text-xl mb-8 mt-4">
              One stop solution for all your learning keedas
            </p>
           
          </div>
        </div>
      </div>

      {/* Our Services Section */}
      <section className="py-10" id="services">
        <div className="container mx-auto px-4">
        <h1 className='text-violet-400 font-bold text-4xl text-center '>Our Services</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 p-20 ">
            {services.map((service, index) => (
              <div key={index} className=" shadow-slate-200 bg-richblack-100/10  rounded-md shadow-md overflow-hidden ring-2 ring-offset-2 ring-violet-500">
                <img
                  src={service.image}
                  alt={service.alt}
                  className="w-full h-80 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-violet-400 mb-2">{service.title}</h3>
                  <p className="text-richblack-200 text-base">
                    {service.description}
                    {service.details && (
                      <details>
                        <summary>Read More</summary>
                        <p>{service.details}</p>
                      </details>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="" id="aboutus">
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 p-20">
            <div className="max-w-lg">
            <h1 className='text-violet-400 font-bold text-4xl text-center '>About us</h1>
              <p className="mt-4 text-richblack-200 text-lg">
                Bappa flour mill provides our customers with the highest quality products and services. We offer a wide variety of flours and spices to choose from, and we are always happy to help our customers find the perfect products for their needs.
                We are committed to providing our customers with the best possible experience. We offer competitive prices, fast shipping, and excellent customer service. We are also happy to answer any questions that our customers may have about our products or services.
                If you are looking for a flour and spices service business that can provide you with the highest quality products and services, then we are the company for you. We look forward to serving you!
              </p>
            </div>
            <div className="mt-12 md:mt-0">
              <img
                src={abt2}
                alt="About Us Image"
                className="object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="text-gray-700 body-font mt-10">
        <div className="flex justify-center text-3xl font-bold text-gray-800 text-center">
        <h1 className='text-violet-400 font-bold text-4xl text-center '>Why us?</h1>
        </div>
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap text-center justify-center">
            {whyUs.map((item, index) => (
              <div key={index} className="p-4 md:w-1/4 sm:w-1/2">
                <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                  <div className="flex justify-center">
                    <img src={item.image} className="w-32 mb-3" alt={item.title} />
                  </div>
                  <h2 className="title-font font-regular text-2xl text-richblack-200">{item.title}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* form to contactus */}
      <div className='w-11/12  flex flex-col justify-center items-center  '>
      <h1 className='text-violet-400 font-bold text-4xl text-center mb-10'>Get in touch</h1>
      <form className="w-[50%] flex flex-col gap-5">
        <div className="flex gap-x-4">
          <label htmlFor="" className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              required
              placeholder="Enter First Name"
              onChange={changeHandler}
              value={formData.firstName}
              name="firstName"
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
            />
          </label>

          <label htmlFor="" className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              required
              placeholder="Enter Last Name"
              onChange={changeHandler}
              value={formData.lastName}
              name="lastName"
              className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
            />
          </label>
        </div>

        <label htmlFor="" className="w-full">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Email Address
            <sup className="text-pink-200">*</sup>
          </p>

          <input
            type="email"
            required
            placeholder="Enter your email address"
            value={formData.email}
            onChange={changeHandler}
            className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
            name="email"
          />
        </label>

        <label htmlFor="" className="w-full">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Contact no.
            <sup className="text-pink-200">*</sup>
          </p>

          <input
            type="tel"
            required
            placeholder="Enter your contact no."
            value={formData.contact}
            onChange={changeHandler}
            className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
            name="contact"
          />
        </label>

        <label htmlFor="" className="w-full">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
           Message
            <sup className="text-pink-200">*</sup>
          </p>

          <textarea
            type="text"
          
            placeholder="Enter your message"
            value={formData.message}
            onChange={changeHandler}
            className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
            name="message"
          />
        </label>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Submit
        </button>
      </form>
      </div>
    </div>
  );
};

export default Aboutus;
