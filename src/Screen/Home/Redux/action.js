export const getMovieAction = payload => {
  return {type: 'GET_MOVIE', payload};
};

export const getMovieActionSuccess = payload => {
  return {type: 'GET_MOVIE_SUCCEES', payload};
};

export const getMovieActionFailed = payload => {
  return {type: 'GET_MOVIE_FAILED', payload};
};

export const getAllMovieGenre = payload => {
  return {type: 'GET__ALL_GENRE', payload};
};

export const getAllMovieGenreSuccess = payload => {
  return {type: 'GET_ALLGENRE_SUCCESS', payload};
};

export const getAllMovieGenreFailed = payload => {
  return {type: 'GET_ALLGENRE_FAILED', payload};
};
