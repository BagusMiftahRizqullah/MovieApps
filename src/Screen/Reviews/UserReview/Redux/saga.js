import axios from 'axios';
import {put, takeEvery} from 'redux-saga/effects';
import {GET_USER_REVIEWS} from './action';
import {setUserReviews} from './action';
import {Store} from '../../../../Store/Store';
import moment from 'moment';

function* getUserReviewsAPI(action) {
  try {
    const result = yield axios({
      method: 'GET',
      url: 'https://moviesteamd.herokuapp.com/api/v1/review/' + action.payload,
      headers: {
        Authorization: Store.getState().LoginReducer.data.token,
      },
    });
    console.log(result, '<<<<< user review response');

    const data = result.data.data;
    if (data != null) {
      yield put(
        setUserReviews([
          {
            image:
              data.movie_id != null
                ? 'https://image.tmdb.org/t/p/original' +
                  data.movie_id.poster_path
                : '',
            movie: data.movie_id != null ? data.movie_id.title : '',
            date: moment(data.createdAt).format('MMMM DD, yyyy'),
            rating: data.score,
            year:
              data.movie_id != null
                ? moment(data.movie_id.release_date).format('yyyy')
                : '',
            title: data.review_headline,
            message: data.review_detail,
          },
        ]),
      );
    }
  } catch (error) {
    console.log(error, '<<<<< user review response error');
  }
}

export function* SagaUserReview() {
  yield takeEvery(GET_USER_REVIEWS, getUserReviewsAPI);
}
