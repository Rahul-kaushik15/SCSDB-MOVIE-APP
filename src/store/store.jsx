import { configureStore } from "@reduxjs/toolkit";
import MovieReducer from "./reducers/movieSlice.jsx";
import TvReducer from "./reducers/tvslice.jsx";
import PeopleReducer from "./reducers/peopleslice.jsx";


export const store = configureStore({
    reducer:{
        movie: MovieReducer,
        tv: TvReducer,
        people: PeopleReducer,
    }
})



export default store ;