export const GET_MOVIE_DETAIL = 'GET_MOVIE_DETAIL';
export const SET_MOVIE_DETAIL = 'SET_MOVIE_DETAIL';

export const getMovieDetail = id => {
  return {
    type: GET_MOVIE_DETAIL,
    payload: id,
  };
};

export const setMovieDetail = payload => {
  return {
    type: SET_MOVIE_DETAIL,
    payload,
  };
};
