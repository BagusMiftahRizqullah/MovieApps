import {SET_MOVIE_DETAIL, GET_MOVIE_DETAIL} from './action';

const initialState = {
  movie: {
    id: '',
    title: '',
    genre: '',
    year: '',
    rating: '',
    description: '',
    posterImage: '',
    descImage: '',
  },
  isLoading: false,
};

const HomeDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE_DETAIL:
      return {
        ...state,
        isLoading: true,
      };
    case SET_MOVIE_DETAIL:
      return {
        ...state,
        isLoading: false,
        movie: action.payload,
      };
    default:
      return state;
  }
};

export default HomeDetailReducer;
