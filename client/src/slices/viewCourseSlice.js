import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  courseSectionData : [],
  courseEntireData : [],
  completedLectures : [],
  totalNoOfLectures : 0,
}

const viewCourseSlice = createSlice({
    name: "viewCourse",
    initialState,
    reducers: {
      setCourseSectionData(state, actions) {  
        
        state.courseSectionData = actions.payload;
        console.log("inslice",state.courseSectionData)
      },
      setEntireCourseData(state,actions){
        state.courseEntireData = actions.payload;
      },
      setTotalNoOfLectures(state,actions){
        state.totalNoOfLectures = actions.payload;
      },
      setCompletedLectures(state,actions){
        state.completedLectures = actions.payload;
      },
      updateCompletedLectures(state,value){
        state.completedLectures =[...state.completedLectures, value.payload];
      }
    },
  });
//state is needed to access and update the current slice of state (in this case, to modify state.token).
// value is needed to get the new data (in this case, the token value) from the action's payload.
export const {setCourseSectionData,setEntireCourseData,setTotalNoOfLectures,setCompletedLectures,updateCompletedLectures} = viewCourseSlice.actions;
export default viewCourseSlice.reducer;


//for reference https://chatgpt.com/share/6a21ae57-82c7-4a02-9c6f-6cbd082a147f