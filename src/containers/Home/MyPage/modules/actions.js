import * as ActionType from "./constants";
import { apiFront } from "../../../../utils/apiUtils";

export const actFetchUserInfo = () => {
  return (dispatch) => {
    dispatch(actUserInfoRequest());

    apiFront
      .post("QuanLyNguoiDung/ThongTinTaiKhoan")
      .then((result) => {
        dispatch(actUserInfoSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actUserInfoFailed(error));
      });
  };
};

const actUserInfoRequest = () => {
  return {
    type: ActionType.USER_INFO_REQUEST,
  };
};

const actUserInfoSuccess = (data) => {
  return {
    type: ActionType.USER_INFO_SUCCESS,
    payload: data,
  };
};

const actUserInfoFailed = (error) => {
  return {
    type: ActionType.USER_INFO_FAILED,
    payload: error,
  };
};

export const actFetchUpdateUserInfo = (user) => {
  return (dispatch) => {
    dispatch(actUpdateUserInfoRequest());

    apiFront
      .put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", user)
      .then((result) => {
        dispatch(actUpdateUserInfoSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actUpdateUserInfoFailed(error));
      });
  };
};

const actUpdateUserInfoRequest = () => {
  return {
    type: ActionType.UPDATE_USER_INFO_REQUEST,
  };
};

const actUpdateUserInfoSuccess = (data) => {
  return {
    type: ActionType.UPDATE_USER_INFO_SUCCESS,
    payload: data,
  };
};

const actUpdateUserInfoFailed = (error) => {
  return {
    type: ActionType.UPDATE_USER_INFO_FAILED,
    payload: error,
  };
};

export const actUpdateInfoReset = () => {
  return {
    type: ActionType.UPDATE_USER_INFO_RESET,
  };
};