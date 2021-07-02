export const GET_USER_REVIEWS = 'GET_USER_REVIEWS';
export const SET_USER_REVIEWS = 'SET_USER_REVIEWS';
export const EDIT_REVIEW_SUCCESS = 'EDIT_REVIEW_SUCCESS';
export const DELETE_REVIEW_SUCCESS = 'DELETE_REVIEW_SUCCESS';
export const SUBMIT_REVIEW = 'SUBMIT_REVIEW';

export const getUserReviews = id => {
  return {
    type: GET_USER_REVIEWS,
    payload: id,
  };
};

export const setUserReviews = payload => {
  return {
    type: SET_USER_REVIEWS,
    payload,
  };
};

export const userSubmitReview = payload => {
  return {
    type: SUBMIT_REVIEW,
    payload,
  };
};

export const editReviewSuccess = payload => {
  return {
    type: EDIT_REVIEW_SUCCESS,
    payload,
  };
};

export const deleteReviewSuccess = payload => {
  return {
    type: DELETE_REVIEW_SUCCESS,
    payload,
  };
};
