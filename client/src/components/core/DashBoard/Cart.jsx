import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses'
import RenderTotalAmount from './RenderTotalAmount'
const Cart = () => {
  const {total,totalItems} = useSelector((state) => state.cart)
  const {user} = useSelector((state)=>state.profile)
  return ( 
    <div className='py-10'>
      <div className='flex flex-col '>
      <div>
    <h1 className="text-4xl font-bold text-violet-300 mb-10 text-center">Cart</h1>
  
    <p className="border-b border-b-richblack-400 pb-2 text-richblack-5 text-center  text-[26px]">
      {totalItems} Courses in Cart
    </p>
    </div>

    </div>
    {total > 0 ? (
      <>
      <div className="mt-8 flex flex-col  gap-x-10 gap-y-6 justify-center items-center">
        <RenderCartCourses />
        <div className='w-[50%] '>
        <RenderTotalAmount/>
      </div>
      </div>
     
      </>
    ) : (
      <p className="mt-14 text-center text-3xl text-richblack-100">
        Your cart is empty
      </p>
    )}
  </div>
  )
}

export default Cart
