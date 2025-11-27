
export { removemovie } from '../reducers/movieSlice';
import axios from '../../utils/axios';
import { loadmovie } from '../reducers/movieSlice';

export const asyncloadmovie = (id) => async (dispatch, getState) => {
    // console.log(dispatch)
  try {
    const detail = await axios.get(`/movie/${id}`);
    const externalid = await axios.get(`/movie/${id}/external_ids`);
    const recommendation = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchprovider = await axios.get(`/movie/${id}/watch/providers`);

    let theultimatedetails = {
      detail: detail.data, // FIXED
      externalid: externalid.data,
      recommendation: recommendation.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchprovider: watchprovider.data.results.IN,
    };
    console.log(theultimatedetails)

    dispatch(loadmovie(theultimatedetails));
  } catch (error) {
    console.log("error:", error);
  }
};
