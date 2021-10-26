import * as ActionType from "./constants";

const initialStatae = {
  loading: false,
  data: null,
  error: null,
  dangChieu: true,
  sapChieu: true,
};

const listMovieReducer = (state = initialStatae, action) => {
  switch (action.type) {
    case ActionType.LIST_MOVIE_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case ActionType.LIST_MOVIE_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case ActionType.LIST_MOVIE_FAILED:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export default listMovieReducer;
