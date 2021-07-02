const initialState = {
  isSignup: false,
  isLoading: false,
  data: [],
  dataSignup: [],
};

const SignupReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP':
      return {
        ...state,
        isLoading: true,
      };

    case 'SIGNUP_SUCCEES':
      return {
        ...state,
        isSignup: true,
        isLoading: false,
        dataSignup: action.payload,
      };

    case 'SIGNUP_FAILED':
      return {
        ...state,
        isLoading: false,
      };

    case 'RESET_AUTH': {
      return {
        ...state,
        isSignup: false,
      };
    }

    default:
      return state;
  }
};

export default SignupReducer;
