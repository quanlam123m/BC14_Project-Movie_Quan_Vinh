import * as ActionType from "./constants";
import axios from "axios";
import { apiFront } from "../../../../utils/apiUtils";

export const actFetchAllMovie = () => {
  return (dispatch) => {
    dispatch(actAllMovieRequest());
    apiFront
      .get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP02")
      .then((result) => {
        dispatch(actAllMovieSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actAllMovieFailed(error));
      });
  };
};

const actAllMovieRequest = () => {
  return {
    type: ActionType.ALL_MOVIE_REQUEST,
  };
};

const actAllMovieSuccess = (data) => {
  return {
    type: ActionType.ALL_MOVIE_SUCCESS,
    payload: data,
  };
};

const actAllMovieFailed = (error) => {
  return {
    type: ActionType.ALL_MOVIE_FAILED,
    payload: error,
  };
};
