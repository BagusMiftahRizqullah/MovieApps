import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

import {GET_REVIEWS} from './action';

import {setReviews} from './action';

function* getReviewsAPI(action) {
  try {
    const result = yield axios({
      method: 'GET',
      url: 'https://moviesteamd.herokuapp.com/api/v1/review',
    });

    const data = result.data.data.results;
    console.log(data, '<<<<< data list review');

    yield put(
      setReviews(
        data.map((value, index) => {
          return {
            id: value._id,
            image: value.user_id ? value.user_id.profile_pic : '',
            rating: value.score,
            username: value.user_id ? value.user_id.fullName : '',
            title: value.review_headline,
            message: value.review_detail,
          };
        }),
      ),
    );
  } catch (error) {
    console.log(error, '<<<<< data list error');
  }
}

export function* SagaReviews() {
  yield takeLatest(GET_REVIEWS, getReviewsAPI);
}
