import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';
import {Store} from '../../../../Store/Store';
import {SET_ADD_REVIEWS, SET_EDIT_REVIEWS, DELETE_REVIEWS} from './action';
import {returnReview} from './action';

import {
  editReviewSuccess,
  deleteReviewSuccess,
} from '../../UserReview/Redux/action';

function* addRatingAPI(action) {
  console.log(action.payload, '<<<<< request submit review');
  console.log(
    Store.getState().LoginReducer.data.id,
    '<<<<< request submit review',
  );

  try {
    const result = yield axios({
      method: 'POST',
      url: 'https://moviesteamd.herokuapp.com/api/v1/review',
      data: {
        user_id: Store.getState().LoginReducer.data.id,
        movie_id: action.payload.movieID ? action.payload.movieID : '',
        score: action.payload.rating,
        review_headline: action.payload.title,
        review_detail: action.payload.message,
      },
      headers: {
        Authorization: Store.getState().LoginReducer.data.token,
      },
    });
    console.log(result, '<<<<< response submit review');

    const data = result.data;
    yield put(
      returnReview({
        movieID: data.movie_id,
        userID: data.user_id,
        title: data.review_headline,
        message: data.review_detail,
        rating: data.score,
      }),
    );
  } catch (error) {
    console.log(error.response, '<<<<< submit review error');
  }
}

function* editRatingAPI(action) {
  console.log(action, '<<<<< request edit review');

  try {
    const result = yield axios({
      method: 'PUT',
      url:
        'https://moviesteamd.herokuapp.com/api/v1/review/' +
        action.payload.reviewID,
      data: {
        user_id: action.payload.userID,
        movie_id: action.payload.movieID,
        score: action.payload.rating,
        review_headline: action.payload.title,
        review_detail: action.payload.message,
      },
      headers: {
        Authorization: Store.getState().LoginReducer.data.token,
      },
    });
    console.log(result, '<<<<< response edit review');

    const data = result.data.data;
    yield put(
      returnReview({
        movieID: data.movie_id,
        userID: data.user_id,
        title: data.review_headline,
        message: data.review_detail,
        rating: data.score,
      }),
    );
    yield put(editReviewSuccess());
  } catch (error) {
    console.log(error, '<<<<< submit edit error');
  }
}

function* deleteReviewAPI(action) {
  console.log(action, '<<<<< request delete review');

  try {
    const result = yield axios({
      method: 'DELETE',
      url:
        'https://moviesteamd.herokuapp.com/api/v1/review/' +
        action.payload.reviewID,
      headers: {
        Authorization: Store.getState().LoginReducer.data.token,
      },
    });
    console.log(result, '<<<<< response delete review');

    yield put(returnReview({}));
    yield put(deleteReviewSuccess());
  } catch (error) {
    console.log(error, '<<<<< response delete error');
  }
}

export function* SagaAddEditReview() {
  yield takeLatest(SET_ADD_REVIEWS, addRatingAPI);
  yield takeLatest(SET_EDIT_REVIEWS, editRatingAPI);
  yield takeLatest(DELETE_REVIEWS, deleteReviewAPI);
}
