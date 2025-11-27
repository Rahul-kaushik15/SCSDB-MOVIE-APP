import { createSlice } from "@reduxjs/toolkit";

export const peopleslice = createSlice({
    name:"people",
    initialState:{
        info:null,
    },
    reducers:{
        loadpeople: (state,action) =>{
            state.info = action.payload;
        },
        removepeople :(state) =>{
            state.info = null;
        }
    }
})

export const {loadpeople,removepeople} = peopleslice.actions;
export default peopleslice.reducer ;