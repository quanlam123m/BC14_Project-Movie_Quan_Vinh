import * as ActionType from "./constants";
import { api } from "./../../../../../../utils/apiUtils";

export const actFetchUpdateUser = (data, history) => {
  return (dispatch) => {
    dispatch(actUpdateUserRequest());

    api
      .post("QuanLyNguoiDung/CapNhatThongTinNguoiDung", data)
      .then((result) => {
        dispatch(actUpdateUserSuccess(result.data.content));
        alert("Cập nhật thông tin người dùng thành công");
        history.push("/dashboard/film");
      })
      .catch((err) => {
        dispatch(actUpdateUserFailed(err));
      });
  };
};

const actUpdateUserRequest = () => {
  return {
    type: ActionType.UPDATE_USER_REQUEST,
  };
};

const actUpdateUserSuccess = (data) => {
  return {
    type: ActionType.UPDATE_USER_SUCCESS,
    payload: data,
  };
};

const actUpdateUserFailed = (error) => {
  return {
    type: ActionType.UPDATE_USER_FAILED,
    payload: error,
  };
};
