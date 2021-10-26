import * as ActionType from "./constants";
import { api } from "./../../../../../utils/apiUtils";
import { actFetchListMovie } from "../../../../Home/ListMoviePage/modules/actions";

export const actFetchDeleteMovie = (id) => {
  return (dispatch) => {
    dispatch(actDeleteMovieRequest());

    api
      .delete(`QuanLyPhim/XoaPhim?MaPhim=${id}`)
      .then((result) => {
        dispatch(actDeleteMovieSuccess(result.data.content));
        alert("Bạn đã xoá phim thành công");
        dispatch(actFetchListMovie());
      })
      .catch((err) => {
        dispatch(actDeleteMovieFailed(err));
      });
  };
};

const actDeleteMovieRequest = () => {
  return {
    type: ActionType.DELETE_MOVIE_REQUEST,
  };
};

const actDeleteMovieSuccess = (data) => {
  return {
    type: ActionType.DELETE_MOVIE_SUCCESS,
    payload: data,
  };
};

const actDeleteMovieFailed = (error) => {
  return {
    type: ActionType.DELETE_MOVIE_FAILED,
    payload: error,
  };
};
