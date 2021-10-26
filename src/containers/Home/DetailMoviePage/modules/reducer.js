import * as ActionType from "./constants";

const initialState = {
  loading: false,
  error: null,
  dataTongHop: null,
};

const detailMovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.DETAIL_MOVIE_REQUEST:
      state.loading = true;
      state.dataTongHop = null;
      state.error = null;
      return { ...state };

    case ActionType.DETAIL_MOVIE_SUCCESS:
      state.loading = false;
      state.dataTongHop = action.payload;
      state.error = null;
      return { ...state };

    case ActionType.DETAIL_MOVIE_FAILED:
      state.loading = false;
      state.dataTongHop = null;
      state.error = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};

export default detailMovieReducer;
