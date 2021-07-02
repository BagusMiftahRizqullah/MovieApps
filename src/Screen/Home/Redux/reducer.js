const initialState = {
  getMovie: false,
  isLoading: false,
  data: [],
  dataGenre: [],
};

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MOVIE':
      return {
        ...state,
        isLoading: true,
      };

    case 'GET_MOVIE_SUCCEES':
      return {
        ...state,
        getMovie: true,
        isLoading: false,
        data: action.payload,
      };

    case 'GET_MOVIE_FAILED':
      return {
        ...state,
        isLoading: false,
      };

    case 'GET_ALL_GENRE':
      return {
        ...state,
        isLoading: true,
      };

    case 'GET_ALLGENRE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        dataGenre: action.payload,
      };

    case 'GET_ALLGENRE_FAILED':
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default HomeReducer;
