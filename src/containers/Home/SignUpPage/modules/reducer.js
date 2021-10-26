import * as ActionType from "./constants";

const initialState = {
  loading: false,
  dataSignUp: null,
  errorSignUp: null,
};

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SIGNUP_REQUEST:
      state.loading = true;
      state.dataSignUp = null;
      state.errorSignUp = null;
      return { ...state };

    case ActionType.SIGNUP_SUCCESS:
      state.loading = false;
      state.dataSignUp = action.payload;
      state.errorSignUp = null;
      return { ...state };

    case ActionType.SIGNUP_FAILED:
      state.loading = false;
      state.dataSignUp = null;
      state.errorSignUp = action.payload;
      return { ...state };

    case ActionType.SIGNUP_RESET:
      state.loading = false;
      state.dataSignUp = null;
      state.errorSignUp = null;
      return { ...state };

    default:
      return { ...state };
  }
};

export default signUpReducer;
