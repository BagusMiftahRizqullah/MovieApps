import axios from 'axios';
import {ToastAndroid} from 'react-native';
import {takeLatest, put} from 'redux-saga/effects';
import {loginActionSuccess, loginActionFailed} from './action';

const loginApi = payload => {
  return axios({
    method: 'POST',
    url: 'https://moviesteamd.herokuapp.com/api/v1/auth',
    data: payload,
  });
};

function* loginAction(action) {
  try {
    console.log(action.payload);
    const res = yield loginApi(action.payload, '<=======ini hasil login api');
    if (res && res.data) {
      console.log('Berhasil Login');
      console.log(res.data.data.id, 'ini data id');
      ToastAndroid.show('Berhasil LOGIN', ToastAndroid.SHORT, ToastAndroid.TOP);

      yield put(loginActionSuccess(res.data.data));
      yield put({type: 'GET_USER'});
    } else {
      console.log('Gagal Login');
      ToastAndroid.show(res.data.message, ToastAndroid.LONG, ToastAndroid.TOP);
      yield put(loginActionFailed());
    }
  } catch (err) {
    console.log(err, 'gagal Login');
    ToastAndroid.show('gagal Login', ToastAndroid.LONG, ToastAndroid.TOP);
    yield put(loginActionFailed());
  }
}

function* loginSaga() {
  yield takeLatest('LOGIN', loginAction);
}
export default loginSaga;
