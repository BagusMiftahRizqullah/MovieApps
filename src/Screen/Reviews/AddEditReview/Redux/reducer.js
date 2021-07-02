import {SET_REVIEWS, RETURN_REVIEWS} from './action';

const initialState = {
  isSuccess: false,
  rating: {
    title: '',
    message: '',
    rating: 0,
  },
};

const AddEditReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REVIEWS:
      return {
        ...state,
        rating: action.payload,
      };
    case RETURN_REVIEWS:
      return {
        ...state,
        isSuccess: true,
      };
    default:
      return state;
  }
};

export default AddEditReducer;
