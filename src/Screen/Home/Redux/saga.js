import axios from 'axios';
import {takeLatest, put} from 'redux-saga/effects';
import {
  getMovieActionSuccess,
  getMovieActionFailed,
  getAllMovieGenreSuccess,
  getAllMovieGenreFailed,
} from './action';

const movieApi = payload => {
  return axios({
    method: 'GET',
    url: 'https://moviesteamd.herokuapp.com/api/v1/movie',
    data: payload,
  });
};

const movieApiGenre = payload => {
  return axios({
    method: 'GET',
    url: 'https://moviesteamd.herokuapp.com/api/v1/genre',
    data: payload,
  });
};

function* apiGenre(action) {
  try {
    console.log(action.payload);
    const resGen = yield movieApiGenre(action.payload);
    if (resGen && resGen.data) {
      console.log('Data Berhasil Diambil Movie Genre');
      console.log(resGen.data, 'ini data movie Genre');
      yield put(getAllMovieGenreSuccess(resGen.data.data));
    } else {
      console.log('Data Gagal Di Ambil');
    }
  } catch (err) {
    console.log(err, 'data gagal di ambil');
    yield put(getAllMovieGenreFailed());
  }
}

function* homeAction(action) {
  try {
    console.log(action.payload);
    const res = yield movieApi(action.payload);
    if (res && res.data) {
      console.log('Data Berhasil Diambil');
      console.log(res.data, 'ini data movie');
      yield put(getMovieActionSuccess(res.data.data));
    } else {
      console.log('Data Gagal Di Ambil');
      yield put(getMovieActionFailed());
    }
  } catch (err) {
    console.log(err, 'data gagal di ambil');
    yield put(getMovieActionFailed());
  }
}

function* homeSaga() {
  yield takeLatest('GET_MOVIE', homeAction);
  yield takeLatest('GET__ALL_GENRE', apiGenre);
}

export default homeSaga;
