const initialState = {
  isLogin: false,
  isLoading: false,
  data: [],
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoading: true,
      };

    case 'LOGIN_SUCCEES':
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        data: action.payload,
      };

    case 'LOGIN_FAILED':
      return {
        ...state,
        isLoading: false,
      };

    case 'LOGOUT': {
      return {
        ...state,
        isLogin: false,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export default LoginReducer;
