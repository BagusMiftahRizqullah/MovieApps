import {combineReducers} from 'redux';
import HomeReducer from '../Screen/Home/Redux/reducer';
import HomeDetailReducer from '../Screen/Home/HomeDetail/Redux/reducer';
import ReviewsReducer from '../Screen/Reviews/Redux/reducer';
import AddEditReducer from '../Screen/Reviews/AddEditReview/Redux/reducer';
import UserReviewReducer from '../Screen/Reviews/UserReview/Redux/reducer';
import SignupReducer from '../Screen/SignUp/Redux/reducer';
import LoginReducer from '../Screen/Login/Redux/reducer';
import UserReducer from '../Screen/Profile/Redux/reducer';

export const allReducer = combineReducers({
  HomeReducer: HomeReducer,
  HomeDetail: HomeDetailReducer,
  Reviews: ReviewsReducer,
  AddEditReducer: AddEditReducer,
  UserReview: UserReviewReducer,
  SignupReducer: SignupReducer,
  LoginReducer: LoginReducer,
  UserReducer: UserReducer,
});
