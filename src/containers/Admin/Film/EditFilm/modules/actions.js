import * as ActionType from "./constants";
import { api } from "./../../../../../utils/apiUtils";

export const actFetchEditMovie = (id) => {
  return (dispatch) => {
    dispatch(actEditMovieRequest());

    api
      .get(`QuanLyPhim/LayThongTinPhim?MaPhim=${id}`)
      .then((result) => {
        dispatch(actEditMovieSuccess(result.data.content));
      })
      .catch((err) => {
        dispatch(actEditMovieFailed(err));
      });
  };
};

const actEditMovieRequest = () => {
  return {
    type: ActionType.EDIT_MOVIE_REQUEST,
  };
};

const actEditMovieSuccess = (data) => {
  return {
    type: ActionType.EDIT_MOVIE_SUCCESS,
    payload: data,
  };
};

const actEditMovieFailed = (error) => {
  return {
    type: ActionType.EDIT_MOVIE_FAILED,
    payload: error,
  };
};


