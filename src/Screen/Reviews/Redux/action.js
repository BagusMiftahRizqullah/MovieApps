export const GET_REVIEWS = 'GET_REVIEWS';
export const SET_REVIEWS = 'SET_REVIEWS';

export const getReviews = () => {
  return {
    type: GET_REVIEWS,
  };
};

export const setReviews = payload => {
  return {
    type: SET_REVIEWS,
    payload,
  };
};
