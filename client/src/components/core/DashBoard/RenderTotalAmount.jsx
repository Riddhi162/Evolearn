import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IconBtn from '../../common/IconBtn';
import { updateUserCourses } from '../../../slices/profileSlice';

const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const handleBuyCourse = () => {
    console.log("here")
    const courseIds = cart.map((course) => course._id); 
    console.log(courseIds)
    dispatch(updateUserCourses(courseIds));
    console.log(user);
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center text-white">
      <div className="mb-6">
        <p className="text-lg font-medium">Total:</p>
        <p className="text-3xl font-bold text-violet-300">Rs {total}</p>
      </div>
      <IconBtn
        text="Buy now"
        onClick={handleBuyCourse}
        customClasses={
          'w-full justify-center bg-violet-500 hover:bg-violet-600 text-white py-3 rounded-lg font-semibold transition-all duration-300'
        }
      />
    </div>
  );
};

export default RenderTotalAmount;
