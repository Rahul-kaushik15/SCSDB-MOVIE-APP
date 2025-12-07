
export { removepeople } from '../reducers/peopleslice';
import axios from '../../utils/axios';
import { loadpeople } from '../reducers/peopleslice';

export const asyncloadpeople = (id) => async (dispatch, getState) => {
    // console.log(dispatch)
  try {
    const detail = await axios.get(`/person/${id}`);
const externalid = await axios.get(`/person/${id}/external_ids`);
const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
const tvCredits = await axios.get(`/person/${id}/tv_credits`);
const movieCredits = await axios.get(`/person/${id}/movie_credits`);

    

    

    let theultimatedetails = {
      detail: detail.data, // FIXED
      externalid: externalid.data,
      combinedCredits: combinedCredits.data,
      tvCredits: tvCredits.data,
      movieCredits: movieCredits.data,
    };
    console.log(theultimatedetails)

    dispatch(loadpeople(theultimatedetails));
  } catch (error) {
    console.log("error:", error);
  }
};
