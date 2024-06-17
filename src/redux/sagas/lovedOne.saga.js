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
import { getLovedOneApi, createLovedOneApi, updateLovedOneApi, removeLovedOneApi } from './api/lovedOne.api';

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
    const response = yield call(createLovedOneApi, action.payload);
    const lovedOneData = response.data; // Assuming the API response contains the loved one data

    // Extract the necessary properties from the response
    const lovedOneId = lovedOneData.id || lovedOneData.lovedOneId; // Adjust property name as per the response
    const first_name = lovedOneData.first_name;
    const last_name = lovedOneData.last_name;

    // Dispatch the success action with the extracted data
    yield put({ type: CREATE_LOVED_ONE_SUCCESS, payload: { lovedOneId, first_name, last_name } });
  } catch (error) {
    yield* handleError(error, CREATE_LOVED_ONE_FAILURE);
  }
}

// Saga to handle updates to a loved one
function* updateLovedOneSaga(action) {
  try {
    const { loved_one_id, ...updates } = action.payload;
    const response = yield call(updateLovedOneApi, loved_one_id, updates);

    // Dispatch the success action with the updated loved one data
    yield put({ type: UPDATE_LOVED_ONE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: UPDATE_LOVED_ONE_FAILURE, payload: error.message });
  }
}

// Saga to fetch details of a loved one
// Dispatches success or failure actions based on API call result
function* getLovedOneSaga(action) {
  try {
    const response = yield call(getLovedOneApi, action.payload);
    yield put({ type: GET_LOVED_ONE_SUCCESS, payload: response.data });
  } catch (error) {
    yield* handleError(error, GET_LOVED_ONE_FAILURE);
  }
}

// Saga to handle removal of a loved one
// Similar structure to other sagas, dispatches success or failure based on API call
function* removeLovedOneSaga(action) {
  try {
    const response = yield call(removeLovedOneApi, action.payload);
    // The API response only includes a success message, so we don't need to pass any payload
    yield put({ type: REMOVE_LOVED_ONE_SUCCESS });
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