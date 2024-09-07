import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
const initialState = {
  total:localStorage.getItem("total")? JSON.parse(localStorage.getItem("total")): 0,

  cart:localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")): [],

   totalItems:localStorage.getItem("totalItems")? JSON.parse(localStorage.getItem("totalItems")): 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      settotalItems(state, action) {  
        state.totalItems = action.payload;
      },
      //add to acrt
      addToCart:(state,action)=>{
        const course = action.payload
        // const index = state.cart.findIndex((item)=>item._id === course._id)
        // if(index>=0){
        //   toast.error("Course already in cart")
        //   return
        // }
        state.cart.push(course)
        state.totalItems++;
        state.total += course.price
        localStorage.setItem("cart",JSON.stringify(state.cart))
          localStorage.setItem("total",JSON.stringify(state.total))
          localStorage.setItem("totalItems",JSON.stringify(state.totalItems))

      },
      resetCart: (state) => {
        state.cart = [];
        state.totalItems = 0;
        state.total = 0;
      },
      removeFromCart:(state,action)=>{
        const courseId = action.payload
        const index = state.cart.findIndex((item)=>item._id === courseId)
        console.log(courseId);
        if(index>=0){
          state.totalItems--;
          state.total -= state.cart[index].price
          state.cart.splice(index,1)
          localStorage.setItem("cart",JSON.stringify(state.cart))
          localStorage.setItem("total",JSON.stringify(state.total))
          localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
         
       
        }
       else{
        toast.error("Course not in cart")
        return 
       }
      }
      //remove from cart
      //resetcart
    },
  });
//state is needed to access and update the current slice of state (in this case, to modify state.token).
// value is needed to get the new data (in this case, the token value) from the action's payload. 
export const {settotalItems,addToCart,removeFromCart,resetCart} = cartSlice.actions;
export default cartSlice.reducer;


//for reference https://chatgpt.com/share/6a21ae57-82c7-4a02-9c6f-6cbd082a147f