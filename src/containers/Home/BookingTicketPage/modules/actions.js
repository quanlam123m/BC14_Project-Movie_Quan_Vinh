import * as ActionType from "./constants";
import {apiFront} from "../../../../utils/apiUtils";

export const selectSeatAction = (hang, cot, ghe) => {
  return {
    type: ActionType.SELECT_GHE,
    payload: { hang, cot, ghe },
  };
};

export const deleteSeatAction = (soGhe) => {
  return {
    type: ActionType.DELETE_GHE,
    payload: soGhe,
  };
};

export const clearGheDangChon = () => {
  return {
    type: ActionType.CLEAR_GHE_DANG_CHON,
    payload: null,
  };
};

export const actFetchPhongVeInfo = (id) => {
  return (dispatch) => {
    dispatch(actPhongVeInfoRequest());

    apiFront
      .get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`)
      .then((result) => {
        dispatch(actPhongVeInfoSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actPhongVeInfoFailed(error));
      });
  };
};

const actPhongVeInfoRequest = () => {
  return {
    type: ActionType.PHONGVE_INFO_REQUEST,
  };
};

const actPhongVeInfoSuccess = (data) => {
  return {
    type: ActionType.PHONGVE_INFO_SUCCESS,
    payload: data,
  };
};

const actPhongVeInfoFailed = (error) => {
  return {
    type: ActionType.PHONGVE_INFO_FAILED,
    payload: error,
  };
};

export const actSetDataGhe = (data) => {
  return {
    type: ActionType.SET_DATA_GHE,
    payload: data,
  };
};
