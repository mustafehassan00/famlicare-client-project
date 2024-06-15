import { call, put, takeLatest } from 'redux-saga/effects';
import { CREATE_LOVED_ONE_REQUEST, UPDATE_LOVED_ONE_REQUEST, UPDATE_USER_TABLE_REQUEST } from './actions';
import { createLovedOneApi, updateLovedOneApi, updateUserTableApi } from './api'; // Define these API functions

function* createLovedOneSaga(action) {
  try {
    const response = yield call(createLovedOneApi, action.payload);
    yield put({ type: 'CREATE_LOVED_ONE_SUCCESS', payload: response });
  } catch (error) {
    yield put({ type: 'CREATE_LOVED_ONE_FAILURE', error });
  }
}

function* updateLovedOneSaga(action) {
  try {
    const response = yield call(updateLovedOneApi, action.payload.id, action.payload.data);
    yield put({ type: 'UPDATE_LOVED_ONE_SUCCESS', payload: response });
  } catch (error) {
    yield put({ type: 'UPDATE_LOVED_ONE_FAILURE', error });
  }
}

function* updateUserTableSaga(action) {
  try {
    const response = yield call(updateUserTableApi, action.payload);
    yield put({ type: 'UPDATE_USER_TABLE_SUCCESS', payload: response });
  } catch (error) {
    yield put({ type: 'UPDATE_USER_TABLE_FAILURE', error });
  }
}

export default function* rootSaga() {
  yield takeLatest(CREATE_LOVED_ONE_REQUEST, createLovedOneSaga);
  yield takeLatest(UPDATE_LOVED_ONE_REQUEST, updateLovedOneSaga);
  yield takeLatest(UPDATE_USER_TABLE_REQUEST, updateUserTableSaga);
}