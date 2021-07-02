import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

import {GET_MOVIE_DETAIL} from './action';

import {setMovieDetail} from './action';
import moment from 'moment';

function* getMovieAPI(action) {
  console.log(action, '<<<<< request movie detail');

  try {
    const result = yield axios({
      method: 'GET',
      url: 'https://moviesteamd.herokuapp.com/api/v1/movie/' + action.payload,
    });
    console.log(result, '<<<<< response movie detail');
    const data = result.data.data;
    yield put(
      setMovieDetail({
        id: data._id,
        title: data.title,
        genre: data.genres[0],
        year: moment(data.release_date).format('YYYY'),
        rating: data.rating,
        description: data.overview,
        posterImage: 'https://image.tmdb.org/t/p/original' + data.backdrop_path,
        descImage: 'https://image.tmdb.org/t/p/original' + data.poster_path,
        trailer:
          data.more_details.length > 0
            ? data.more_details[0].trailer_instance
            : '',
        totalReview: result.data.total_review,
      }),
    );
  } catch (error) {
    console.log(error, '<<<<< error movie detail');
  }
}

export function* SagaHomeDetail() {
  yield takeLatest(GET_MOVIE_DETAIL, getMovieAPI);
}
