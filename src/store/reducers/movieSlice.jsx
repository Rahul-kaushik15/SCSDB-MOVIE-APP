import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
    name:"movie",
    initialState:{
        info:null,
    },
    reducers:{
        loadmovie: (state,action) =>{
            state.info = action.payload;
        },
        removemovie :(state) =>{
            state.info = null;
        }
    }
  
})

export const {loadmovie,removemovie} = movieSlice.actions;
export default movieSlice.reducer ; 