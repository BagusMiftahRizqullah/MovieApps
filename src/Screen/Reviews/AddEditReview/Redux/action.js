export const SET_ADD_REVIEWS = 'SET_ADD_REVIEWS';
export const SET_EDIT_REVIEWS = 'SET_EDIT_REVIEWS';
export const DELETE_REVIEWS = 'DELETE_REVIEWS';
export const RETURN_REVIEWS = 'RETURN_REVIEWS';

export const setAddReview = data => {
  return {
    type: SET_ADD_REVIEWS,
    payload: data,
  };
};

export const setEditReview = data => {
  return {
    type: SET_EDIT_REVIEWS,
    payload: data,
  };
};

export const deleteReview = data => {
  return {
    type: DELETE_REVIEWS,
    payload: data,
  };
};

export const returnReview = data => {
  return {
    type: RETURN_REVIEWS,
    payload: data,
  };
};
