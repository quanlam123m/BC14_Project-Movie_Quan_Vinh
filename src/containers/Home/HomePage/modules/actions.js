import * as ActionType from "./constants";
import { apiFront } from "../../../../utils/apiUtils";

export const actFetchHeThongRap = () => {
  return (dispatch) => {
    dispatch(actHeThongRapRequest());
    apiFront
      .get(`QuanLyRap/LayThongTinHeThongRap`)
      .then((result) => {
        dispatch(actHeThongRapSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actHeThongRapFailed(error));
      });
  };
};

const actHeThongRapRequest = () => {
  return {
    type: ActionType.HE_THONG_RAP_REQUEST,
  };
};

const actHeThongRapSuccess = (data) => {
  return {
    type: ActionType.HE_THONG_RAP_SUCCESS,
    payload: data,
  };
};

const actHeThongRapFailed = (error) => {
  return {
    type: ActionType.HE_THONG_RAP_FAILED,
    payload: error,
  };
};

export const actFetchCumRap2 = (dataHeThongRap) => {
  return (dispatch) => {
    dataHeThongRap?.map((heThongRap) => {
      dispatch(actCumRapRequest(heThongRap.maHeThongRap));
      apiFront
        .get(
          `QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${heThongRap.maHeThongRap}`
        )
        .then((result) => {
          dispatch(actCumRapSuccess(heThongRap.maHeThongRap, result.data.content));
        })
        .catch((error) => {
          dispatch(actCumRapFailed(error));
        });
    });
  };
};

export const actFetchCumRap = (maHeThongRap) => {
  return (dispatch) => {
    dispatch(actCumRapRequest(maHeThongRap));

    apiFront
      .get(
        `QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
      )
      .then((result) => {
        dispatch(actCumRapSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actCumRapFailed(error));
      });
  };
};

const actCumRapRequest = () => {
  return {
    type: ActionType.CUM_RAP_REQUEST,
  };
};

const actCumRapSuccess = (maHeThongRap, data) => {
  return {
    type: ActionType.CUM_RAP_SUCCESS,
    payload: { maHeThongRap, data },
  };
};

const actCumRapFailed = (error) => {
  return {
    type: ActionType.CUM_RAP_FAILED,
    payload: error,
  };
};
