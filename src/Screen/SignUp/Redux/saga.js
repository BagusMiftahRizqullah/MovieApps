import axios from 'axios';
import {ToastAndroid} from 'react-native';
import {takeLatest, put} from 'redux-saga/effects';
import {signupActionSuccess, signupActionFailed} from '../Redux/action';

const signupApi = payload => {
  console.log(payload, 'dariaxios');
  return axios({
    method: 'POST',
    url: 'https://moviesteamd.herokuapp.com/api/v1/user/register',
    data: payload,
  });
};

function* signupAction(action) {
  try {
    console.log(action.payload, 'ini payload');
    const res = yield signupApi(action.payload);
    console.log(res, '====> ini hasil Res');
    if (res && res.data) {
      console.log(res.data, ' data res');
      ToastAndroid.show(
        'Berhasil Sign Up',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );

      yield put(signupActionSuccess(res.data.data));
      // reset belum
    } else if (res.data.status === 409) {
      console.log('Email already in use');
      ToastAndroid.show(
        'Email already in use',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      yield put(signupActionFailed());
      // } else {
      //   console.log('gagal SignUp');
      //   ToastAndroid.show('Gagal SignUp', ToastAndroid.LONG, ToastAndroid.TOP);
      //   yield put(signupActionFailed);
    }
  } catch (err) {
    if (err.response.status === 409) {
      console.log(err.response, 'email already in use');
      yield put(signupActionFailed());
      ToastAndroid.show(
        err.response.data.message,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    } else {
      console.log(err, 'Gagal SignUp');
      ToastAndroid.show('Gagal SignUp', ToastAndroid.LONG, ToastAndroid.TOP);
      yield put(signupActionFailed());
    }
  }
}

function* signupSaga() {
  yield takeLatest('SIGNUP', signupAction);
}

export default signupSaga;
