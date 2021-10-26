import * as ActionType from "./constants";
import { apiFront } from "../../../../utils/apiUtils";

//Giả sử BE trả về exp time: 3600000 (1 giờ)
const TIME_EXP = 3600000;

export const actFetchLogin = (user, history) => {
  return (dispatch) => {
    dispatch(actLoginRequest());

    apiFront
      .post("QuanLyNguoiDung/DangNhap", user)
      .then((result) => {
        //Check maLoaiNguoiDung
        if (result.data.content.maLoaiNguoiDung !== "KhachHang") {
          return Promise.reject({
            response: {
              data: {
                content: "Bạn không có quyền truy cập",
              },
            },
          });
        }

        //thời gian hết phiên làm việc
        //lưu exp xuống localStorage
        const date = new Date().getTime();
        const exp = date + TIME_EXP;
        localStorage.setItem("exp", exp);

        //setTimeOut để logout
        dispatch(actSetTimeLogout(history, TIME_EXP));

        //Luu trang thai login
        localStorage.setItem("User", JSON.stringify(result.data.content));

        history.replace("/mypage");
        dispatch(actLoginSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actLoginFailed(error));
      });
  };
};

export const actLogout = (history) => {
  //xoa localStorage
  localStorage.removeItem("User");
  localStorage.removeItem("exp");

  //redirect ve trang /
  history.replace("/");

  //clear reducer
  return {
    type: ActionType.USER_LOGOUT_CLEAR_DATA,
  };
};

const actSetTimeLogout = (history, exp) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(actLogout(history));
    }, exp);
  };
};

//Trường hợp reload lại trang web
export const actTryLogin = (history) => {
  return (dispatch) => {
    const user = JSON.parse(localStorage.getItem("User"));
    if (!user) return;

    //Tính toán thời gian exp
    const exp = localStorage.getItem("exp");
    const date = new Date().getTime();

    if (date > exp) {
      //logout
      dispatch(actLogout(history));
      return;
    }
    dispatch(actSetTimeLogout(history, exp - date));
    dispatch(actLoginSuccess(user));
  };
};

const actLoginRequest = () => {
  return {
    type: ActionType.LOGIN_REQUEST,
  };
};

const actLoginSuccess = (data) => {
  return {
    type: ActionType.LOGIN_SUCCESS,
    payload: data,
  };
};

const actLoginFailed = (error) => {
  return {
    type: ActionType.LOGIN_FAILED,
    payload: error,
  };
};

export const actLoginReset = () => {
  return {
    type: ActionType.LOGIN_RESET,
  };
};
