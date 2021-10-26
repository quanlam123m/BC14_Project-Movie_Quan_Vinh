import * as ActionType from "./constants";

const initialStatae = {
  loadingHistory: false, //user's history load
  dataHistory: null, //user's history
  errorHistory: null, ////user's history load error
  loadingUpdateInfo: false,
  dataUpdateInfo: null,
  errorUpdateInfo: null,
  updateSuccessMess: null,
};

const userHistoryReducer = (state = initialStatae, action) => {
  switch (action.type) {
    case ActionType.USER_INFO_REQUEST:
      state.loadingHistory = true;
      state.dataHistory = null;
      state.errorHistory = null;
      return { ...state };

    case ActionType.USER_INFO_SUCCESS:
      state.loadingHistory = false;
      state.dataHistory = action.payload;
      state.errorHistory = null;
      return { ...state };

    case ActionType.USER_INFO_FAILED:
      state.loadingHistory = false;
      state.dataHistory = null;
      state.errorHistory = action.payload;
      return { ...state };

    case ActionType.UPDATE_USER_INFO_REQUEST:
      state.loadingUpdateInfo = true;
      state.dataUpdateInfo = null;
      state.errorUpdateInfo = null;
      state.updateSuccessMess = null;
      return { ...state };

    case ActionType.UPDATE_USER_INFO_SUCCESS:
      state.loadingUpdateInfo = false;
      state.dataUpdateInfo = action.payload;
      state.errorUpdateInfo = null;
      state.updateSuccessMess = "Cập nhật thành công!";
      return { ...state };

    case ActionType.UPDATE_USER_INFO_FAILED:
      state.loadingUpdateInfo = false;
      state.dataUpdateInfo = null;
      state.errorUpdateInfo = action.payload;
      state.updateSuccessMess = null;
      return { ...state };

    case ActionType.UPDATE_USER_INFO_RESET:
      state.loadingUpdateInfo = false;
      state.dataUpdateInfo = null;
      state.errorUpdateInfo = null;
      state.updateSuccessMess = null;
      return { ...state };

    default:
      return { ...state };
  }
};

export default userHistoryReducer;
