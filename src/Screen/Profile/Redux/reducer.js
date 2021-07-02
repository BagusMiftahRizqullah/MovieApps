const initialState = {
  getUser: false,
  isSuccess: false,
  isLoading: false,
  data: {},
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        isLoading: true,
      };

    case 'GET_USER_SUCCEES':
      return {
        ...state,
        getUser: true,
        isSuccess: false,
        isLoading: false,
        data: action.payload,
      };

    case 'GET_USER_FAILED':
      return {
        ...state,
        isLoading: false,
      };

    case 'EDIT_USER':
      return {
        ...state,
        data: action.payload,
        isLoading: true,
      };

    case 'EDIT_USER_SUCCESS':
      return {
        ...state,
        isSuccess: true,
        getUser: false,
        isLoading: false,
        data: action.payload,
      };

    case 'EDIT_USER_FAILED':
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default UserReducer;
