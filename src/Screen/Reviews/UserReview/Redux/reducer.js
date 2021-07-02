import {
  DELETE_REVIEW_SUCCESS,
  EDIT_REVIEW_SUCCESS,
  GET_USER_REVIEWS,
  SET_USER_REVIEWS,
  SUBMIT_REVIEW,
} from './action';

const initialState = {
  userReview: [],
  isEdited: false,
  isDeleted: false,
  isLoading: false,
};

const UserReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REVIEWS:
      return {
        ...state,
        isLoading: true,
      };
    case SET_USER_REVIEWS:
      return {
        ...state,
        userReview: action.payload,
        isLoading: false,
        isEdited: false,
        isDeleted: false,
      };
    case SUBMIT_REVIEW:
      return {
        ...state,
        isLoading: true,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isEdited: false,
        isDeleted: true,
      };
    case EDIT_REVIEW_SUCCESS:
      return {
        ...state,
        isDeleted: false,
        isLoading: false,
        isEdited: true,
      };
    default:
      return state;
  }
};

export default UserReviewReducer;
