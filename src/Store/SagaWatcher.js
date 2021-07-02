import {all} from 'redux-saga/effects';
import {SagaHomeDetail} from '../Screen/Home/HomeDetail/Redux/saga';
import {SagaReviews} from '../Screen/Reviews/Redux/saga';
import {SagaAddEditReview} from '../Screen/Reviews/AddEditReview/Redux/saga';
import {SagaUserReview} from '../Screen/Reviews/UserReview/Redux/saga';
import SagaSignup from '../Screen/SignUp/Redux/saga';
import SagaLogin from '../Screen/Login/Redux/saga';
import SagaHome from '../Screen/Home/Redux/saga';
import SagaUser from '../Screen/Profile/Redux/saga';

export function* SagaWacther() {
  yield all([
    SagaHomeDetail(),
    SagaReviews(),
    SagaAddEditReview(),
    SagaUserReview(),
    SagaSignup(),
    SagaLogin(),
    SagaHome(),
    SagaUser(),
  ]);
}
