import * as ActionType from "./constants";
import {apiFront} from "./../../../../../utils/apiUtils";

export const actAddCarousel = () => {
  return (dispatch) => {
    dispatch(actAddCarouselRequest());
    apiFront
      .get("QuanLyPhim/LayDanhSachBanner")
      .then((result) => {
        dispatch(actAddCarouselSuccess(result.data.content));
      })
      .catch((err) => {
        dispatch(actAddCarouselFailed(err));
      });
  };
};

const actAddCarouselRequest = () => {
  return {
    type: ActionType.ADD_CAROUSEL_REQUEST,
  };
};

const actAddCarouselSuccess = (data) => {
  return {
    type: ActionType.ADD_CAROUSEL_SUCCESS,
    payload: data,
  };
};

const actAddCarouselFailed = (error) => {
  return {
    type: ActionType.ADD_CAROUSEL_FAILED,
    payload: error,
  };
};
