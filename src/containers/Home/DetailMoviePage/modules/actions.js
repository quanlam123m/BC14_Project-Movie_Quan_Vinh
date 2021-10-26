import * as ActionType from "./constants";
import {apiFront} from "../../../../utils/apiUtils";

export const actFetchDetailMovie = (id) => {
  return (dispatch) => {
    dispatch(actDetailMovieRequest());

    apiFront
      .get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`)
      .then((result) => {
        dispatch(actDetailMovieSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actDetailMovieFailed(error));
      });
      
  };
};

const actDetailMovieRequest = () => {
  return {
    type: ActionType.DETAIL_MOVIE_REQUEST,
  };
};

const actDetailMovieSuccess = (data) => {
  return {
    type: ActionType.DETAIL_MOVIE_SUCCESS,
    payload: data,
  };
};

const actDetailMovieFailed = (error) => {
  return {
    type: ActionType.DETAIL_MOVIE_FAILED,
    payload: error,
  };
};