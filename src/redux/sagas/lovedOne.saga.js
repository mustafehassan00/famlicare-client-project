import { call, put, takeLatest } from 'redux-saga/effects';
import {
  CREATE_LOVED_ONE_REQUEST,
  UPDATE_LOVED_ONE_REQUEST,
  FETCH_LOVED_ONE_REQUEST,
  DELETE_LOVED_ONE_REQUEST,
  CREATE_LOVED_ONE_SUCCESS,
  CREATE_LOVED_ONE_FAILURE,
  UPDATE_LOVED_ONE_SUCCESS,
  UPDATE_LOVED_ONE_FAILURE,
  FETCH_LOVED_ONE_SUCCESS,
  FETCH_LOVED_ONE_FAILURE,
  DELETE_LOVED_ONE_SUCCESS,
  DELETE_LOVED_ONE_FAILURE,
  AUTHORIZATION_FAILURE,
} from '../reducers/actions/lovedOne.actions.js';
import {
  createLovedOneApi,
  updateLovedOneApi,
  fetchLovedOneApi,
  deleteLovedOneApi,
} from '../api'; // Assuming these API functions are defined elsewhere

// Centralized error handling
function* handleError(error, failureAction) {
  console.error('Saga error:', error);
  if (error.status === 401) {
    yield put({ type: AUTHORIZATION_FAILURE, error });
  } else {
    yield put({ type: failureAction, error });
  }
}

function* createLovedOneSaga(action) {
  try {
    const response = yield call(createLovedOneApi, action.payload);
    yield put({ type: CREATE_LOVED_ONE_SUCCESS, response });
  } catch (error) {
    yield* handleError(error, CREATE_LOVED_ONE_FAILURE);
  }
}

function* updateLovedOneSaga(action) {
  try {
    const response = yield call(updateLovedOneApi, action.payload);
    yield put({ type: UPDATE_LOVED_ONE_SUCCESS, response });
  } catch (error) {
    yield* handleError(error, UPDATE_LOVED_ONE_FAILURE);
  }
}

function* fetchLovedOneSaga(action) {
  try {
    const response = yield call(fetchLovedOneApi, action.payload);
    yield put({ type: FETCH_LOVED_ONE_SUCCESS, response });
  } catch (error) {
    yield* handleError(error, FETCH_LOVED_ONE_FAILURE);
  }
}

function* deleteLovedOneSaga(action) {
  try {
    const response = yield call(deleteLovedOneApi, action.payload);
    yield put({ type: DELETE_LOVED_ONE_SUCCESS, response });
  } catch (error) {
    yield* handleError(error, DELETE_LOVED_ONE_FAILURE);
  }
}

// Root saga
export default function* rootSaga() {
  yield takeLatest(CREATE_LOVED_ONE_REQUEST, createLovedOneSaga);
  yield takeLatest(UPDATE_LOVED_ONE_REQUEST, updateLovedOneSaga);
  yield takeLatest(FETCH_LOVED_ONE_REQUEST, fetchLovedOneSaga);
  yield takeLatest(DELETE_LOVED_ONE_REQUEST, deleteLovedOneSaga);
}