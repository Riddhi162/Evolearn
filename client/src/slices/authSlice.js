import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  signupData: null,
  loading:false,
    token:  localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
    //if we get the item from localstorage suppose a user logged in and then went out of the browser value of local storage will be given here if not then set it to null
}

const authSlice = createSlice({

    name: "auth",
    initialState,
    reducers: {
      setSignUpData(state,value){
        state.signupData = value.payload;
      },
      setLoading(state,value){
        state.loading = value.payload;
      },
      setToken(state, value) { 
        state.token = value.payload;
      },
      logout(state) {
     
        state.token = null;
        localStorage.removeItem("token");
      },
    },
  });
//state is needed to access and update the current slice of state (in this case, to modify state.token).
// value is needed to get the new data (in this case, the token value) from the action's payload.
export const {setSignUpData,setLoading,setToken,logout} = authSlice.actions;
export default authSlice.reducer;


//for reference https://chatgpt.com/share/6a21ae57-82c7-4a02-9c6f-6cbd082a147f