import * as ActionType from "./constants";
import { api } from "./../../../../../../utils/apiUtils";

export const actFetchUpdateMovie = (data, history) => {
  return (dispatch) => {
    dispatch(actUpdateMovieRequest());

    api
      .post("QuanLyPhim/CapNhatPhimUpload", data)
      .then((result) => {
        dispatch(actUpdateMovieSuccess(result.data.content));
        alert("Cập nhật phim thành công");
        history.push("/dashboard/film");
      })
      .catch((err) => {
        dispatch(actUpdateMovieFailed(err));
      });
  };
};

const actUpdateMovieRequest = () => {
  return {
    type: ActionType.UPDATE_MOVIE_REQUEST,
  };
};

const actUpdateMovieSuccess = (data) => {
  return {
    type: ActionType.UPDATE_MOVIE_SUCCESS,
    payload: data,
  };
};

const actUpdateMovieFailed = (error) => {
  return {
    type: ActionType.UPDATE_MOVIE_FAILED,
    payload: error,
  };
};
