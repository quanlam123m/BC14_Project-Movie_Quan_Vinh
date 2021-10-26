import * as ActionType from "./constants";

const initialState = {
  loadingHTRap: false,
  errorHTRap: null,
  dataHTRap: null,
  loadingCumRap: false,
  errorCumRap: null,
  dataHTCumRap: [],
  dataCumRap: null,
};

const thongTinRapReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.HE_THONG_RAP_REQUEST:
      state.loadingHTRap = true;
      state.dataHTRap = null;
      state.errorHTRap = null;
      return { ...state };

    case ActionType.HE_THONG_RAP_SUCCESS:
      state.loadingHTRap = false;
      state.dataHTRap = action.payload;
      state.errorHTRap = null;
      return { ...state };

    case ActionType.HE_THONG_RAP_FAILED:
      state.loadingHTRap = false;
      state.dataHTRap = null;
      state.errorHTRap = action.payload;
      return { ...state };

    case ActionType.CUM_RAP_REQUEST:
      state.loadingCumRap = true;
      state.dataCumRap = null;
      state.errorCumRap = null;
      return { ...state };

    case ActionType.CUM_RAP_SUCCESS:
      state.loadingCumRap = false;
      state.errorCumRap = null;
      state.dataCumRap = action.payload;
      let temp = [...state.dataHTCumRap];
      temp.push(action.payload);
      state.dataHTCumRap = temp;
      return { ...state };

    case ActionType.CUM_RAP_FAILED:
      state.loadingCumRap = false;
      state.dataCumRap = null;
      state.errorCumRap = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export default thongTinRapReducer;
