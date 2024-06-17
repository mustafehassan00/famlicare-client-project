import { call, put, takeLatest } from 'redux-saga/effects';
import {
  CREATE_LOVED_ONE_REQUEST,
  CREATE_LOVED_ONE_SUCCESS,
  CREATE_LOVED_ONE_FAILURE,

  UPDATE_LOVED_ONE_REQUEST,
  UPDATE_LOVED_ONE_SUCCESS,
  UPDATE_LOVED_ONE_FAILURE,

  GET_LOVED_ONE_REQUEST, 
  GET_LOVED_ONE_SUCCESS, 
  GET_LOVED_ONE_FAILURE, 
  
  REMOVE_LOVED_ONE_REQUEST, 
  REMOVE_LOVED_ONE_SUCCESS, 
  REMOVE_LOVED_ONE_FAILURE, 
  AUTHORIZATION_FAILURE,
} from '../reducers/actions/lovedOne.actions.js';
import { getLovedOneApi, createLovedOneApi, updateLovedOneApi, removeLovedOneApi} from './api/lovedOne.api';

// Centralized error handling function for sagas
// Logs error to console and dispatches appropriate failure action
// If error is 401 (Unauthorized), dispatches AUTHORIZATION_FAILURE action
function* handleError(error, failureAction) {
  console.error('Saga error:', error); // Log error for debugging
  if (error.response && error.response.status === 401) {
    // Handle unauthorized errors specifically
    yield put({ type: AUTHORIZATION_FAILURE, error });
  } else {
    // Handle other errors
    yield put({ type: failureAction, error });
  }
}

// Saga to handle creation of a loved one
// Dispatches success or failure actions based on API call result
function* createLovedOneSaga(action) {
  try {
    const response = yield call(createLovedOneApi, action.payload); // Attempt to call API
    yield put({ type: CREATE_LOVED_ONE_SUCCESS, response }); // Dispatch success action if API call is successful
  } catch (error) {
    yield* handleError(error, CREATE_LOVED_ONE_FAILURE); // Handle errors
  }
}

// Saga to handle updates to a loved one
// Similar structure to createLovedOneSaga
function* updateLovedOneSaga(action) {
  try {
    const response = yield call(updateLovedOneApi, action.payload.loved_one_id, action.payload.updateData);
    yield put({ type: UPDATE_LOVED_ONE_SUCCESS, response });
  } catch (error) {
    yield* handleError(error, UPDATE_LOVED_ONE_FAILURE);
  }
}

// Saga to fetch details of a loved one
// Dispatches success or failure actions based on API call result
function* getLovedOneSaga(action) {
  try {
    const response = yield call(getLovedOneApi, action.payload);
    yield put({ type: GET_LOVED_ONE_SUCCESS, response });
  } catch (error) {
    yield* handleError(error, GET_LOVED_ONE_FAILURE);
  }
}

// Saga to handle removal of a loved one
// Similar structure to other sagas, dispatches success or failure based on API call
function* removeLovedOneSaga(action) {
  try {
    const response = yield call(removeLovedOneApi, action.payload);
    yield put({ type: REMOVE_LOVED_ONE_SUCCESS, response });
  } catch (error) {
    yield* handleError(error, REMOVE_LOVED_ONE_FAILURE);
  }
}

// Root saga that listens for actions and delegates to specific sagas
// Using takeLatest to cancel any ongoing saga if the action is dispatched again
export default function* rootSaga() {
  yield takeLatest(CREATE_LOVED_ONE_REQUEST, createLovedOneSaga);
  yield takeLatest(UPDATE_LOVED_ONE_REQUEST, updateLovedOneSaga);
  yield takeLatest(GET_LOVED_ONE_REQUEST, getLovedOneSaga);
  yield takeLatest(REMOVE_LOVED_ONE_REQUEST, removeLovedOneSaga);
}