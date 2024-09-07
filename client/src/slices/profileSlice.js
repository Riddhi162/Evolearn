import { createSlice } from "@reduxjs/toolkit";
const initialState = {
   user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")): null,
   loading:false,
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
      setUser(state, value) {  
        state.user = value.payload;
        
      },
      setLoading(state,value){
        state.loading = value.payload;
      },
      updateUserCourses: (state, action) => {
        const courseIds = action.payload;
        if (state.user) {
          state.user.courses = [ ...courseIds]; 
          localStorage.setItem("user", JSON.stringify(state.user)); // Update localStorage
        }
      },
    },
  });
//state is needed to access and update the current slice of state (in this case, to modify state.token).
// value is needed to get the new data (in this case, the token value) from the action's payload.
export const {setUser,setLoading,updateUserCourses} = profileSlice.actions;
export default profileSlice.reducer;


//for reference https://chatgpt.com/share/6a21ae57-82c7-4a02-9c6f-6cbd082a147f