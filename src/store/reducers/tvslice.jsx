import { createSlice } from "@reduxjs/toolkit";

export const tvslice = createSlice({
    name:"tv",
    initialState:{
        info:null,
    },
    reducers:{
        loadtv: (state,action) =>{
            state.info = action.payload;
        },
        removetv :(state) =>{
            state.info = null;
        }
    }
})

export const {loadtv,removetv} = tvslice.actions;
export default tvslice.reducer ;