import axios from 'axios';
import {takeLatest, put} from 'redux-saga/effects';
import {
  getUserActionSuccess,
  getUserActionFailed,
  editUserActionSuccess,
  editUserActionFailed,
} from './action';
import {Store} from '../../../Store/Store';

const userApi = payload => {
  return axios({
    method: 'GET',
    url: `https://moviesteamd.herokuapp.com/api/v1/user/${payload.id}`,
    headers: {Authorization: payload.token},
  });
};

const userEdit = payload => {
  return axios({
    method: 'PUT',
    url: `https://moviesteamd.herokuapp.com/api/v1/user/${
      Store.getState().LoginReducer.data.id
    }`,
    data: {
      fullName: payload.fullName,
      userName: payload.userName,
      email: payload.email,
      password: payload.password,
      profile_pic: payload.profile_pic,
    },
    headers: {Authorization: Store.getState().LoginReducer.data.token},
  });
};

// url: 'https://moviesteamd.herokuapp.com/api/v1/user/60c9c9fc43871a001565aa32',

function* userAction(action) {
  try {
    const res = yield userApi(action.payload);
    if (res && res.data) {
      console.log('Data Berhasil Diambil');
      console.log(res.data, 'ini data User');

      yield put(getUserActionSuccess(res.data.data));
    } else {
      console.log('Data Gagal Di Ambil');
      yield put(getUserActionFailed());
    }
  } catch (err) {
    console.log(err, 'data gagal di ambil');
    yield put(getUserActionFailed());
  }
}

function* editUserAction(action) {
  try {
    const dataUser = yield userEdit(action.payload);
    if (dataUser && dataUser.data) {
      console.log('Data Berhasil Di UPDATE');
      console.log(dataUser.data.data, 'ini data Update');

      yield put(
        editUserActionSuccess({
          fullName: dataUser.fullName,
          userName: dataUser.userName,
          email: dataUser.email,
          password: dataUser.password,
          profile_pic: dataUser.profile_pic,
        }),
      );
    } else {
      console.log('Data Gagal Di UPDATE');
      yield put(editUserActionFailed());
    }
  } catch (err) {
    console.log(err, 'data gagal di UPDATE');
    yield put(getUserActionFailed());
  }
}

function* SagaUser() {
  yield takeLatest('GET_USER', userAction);
  yield takeLatest('EDIT_USER', editUserAction);
}

export default SagaUser;
