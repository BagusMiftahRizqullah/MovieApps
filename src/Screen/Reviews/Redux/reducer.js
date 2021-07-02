import {GET_REVIEWS, SET_REVIEWS} from './action';

const initialState = {
  reviews: [],
  isLoading: false,
};

const ReviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      return {
        ...state,
        isLoading: true,
      };
    case SET_REVIEWS:
      return {
        ...state,
        isLoading: false,
        reviews: action.payload,
      };
    default:
      return state;
  }
};

export default ReviewsReducer;
