
export { removetv } from '../reducers/tvSlice';
import axios from '../../utils/axios';
import { loadtv } from '../reducers/tvSlice';

export const asyncloadtv = (id) => async (dispatch, getState) => {
    console.log(dispatch)
  try {
    const detail = await axios.get(`/tv/${id}`);
    const externalid = await axios.get(`/tv/${id}/external_ids`);
    const recommendation = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchprovider = await axios.get(`/tv/${id}/watch/providers`);

    let theultimatedetails = {
      detail: detail.data, // FIXED
      externalid: externalid.data,
      recommendation: recommendation.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchprovider: watchprovider.data.results.IN,
    };
    console.log(theultimatedetails)

    dispatch(loadtv(theultimatedetails));
  } catch (error) {
    console.log("error:", error);
  }
};
