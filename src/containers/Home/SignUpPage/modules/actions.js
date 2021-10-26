import * as ActionType from "./constants";
import {apiFront} from "../../../../utils/apiUtils";

export const actFetchSignUp = (user, history) => {
  return (dispatch) => {
    dispatch(actSignUpRequest());

    apiFront
      .post("QuanLyNguoiDung/DangKy", user)
      .then((result) => {
        history.replace("/login");
        dispatch(actSignUpSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actSignUpFailed(error));
      });
  };
};

const actSignUpRequest = () => {
  return {
    type: ActionType.SIGNUP_REQUEST,
  };
};

const actSignUpSuccess = (data) => {
  return {
    type: ActionType.SIGNUP_SUCCESS,
    payload: data,
  };
};

const actSignUpFailed = (error) => {
  return {
    type: ActionType.SIGNUP_FAILED,
    payload: error,
  };
};

export const actSignUpReset = () => {
  return {
    type: ActionType.SIGNUP_RESET,
  };
};