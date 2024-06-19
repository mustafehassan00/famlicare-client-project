import { select, call, put, takeLatest } from "redux-saga/effects";
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
  STORE_LOVED_ONE_NAME_INFO_REQUEST,
  STORE_LOVED_ONE_NAME_INFO_SUCCESS,
  STORE_LOVED_ONE_NAME_INFO_FAILURE,
  STORE_LOVED_ONE_ADDRESS_INFO_REQUEST,
  STORE_LOVED_ONE_ADDRESS_INFO_SUCCESS,
  STORE_LOVED_ONE_ADDRESS_INFO_FAILURE,
  STORE_LOVED_ONE_DETAIL_INFO_REQUEST,
  STORE_LOVED_ONE_DETAIL_INFO_SUCCESS,
  STORE_LOVED_ONE_DETAIL_INFO_FAILURE,
} from "../reducers/actions/lovedOne.actions.js";
import {
  getLovedOneApi,
  createLovedOneApi,
  updateLovedOneApi,
  removeLovedOneApi,
} from "./api/lovedOne.api";


// Centralized error handling function for sagas
// Logs error to console and dispatches appropriate failure action
// If error is 401 (Unauthorized), dispatches AUTHORIZATION_FAILURE action
function* handleError(error, failureAction) {
  console.error("Saga error:", error); // Log error for debugging
  if (error.response && error.response.status === 401) {
    // Handle unauthorized errors specifically
    yield put({ type: AUTHORIZATION_FAILURE, error });
  } else {
    // Handle other errors
    yield put({ type: failureAction, error });
  }
}

/// Saga to handle creation of a loved one
// Dispatches success or failure actions based on API call result
function* createLovedOneSaga(action) {
  try {
    // Call the API to create a new loved one with the provided payload (action.payload)
    const response = yield call(createLovedOneApi, action.payload);

    // Check if the API response is undefined, which indicates an issue with the API call
    // This could be due to network issues, server downtime, or incorrect API endpoint
    if (response === undefined) {
      console.error("API response is undefined.");
      // Dispatch a failure action with an error message
      // This allows the application to handle the error (e.g., show an error message to the user)
      yield put({
        type: CREATE_LOVED_ONE_FAILURE,
        error: "API response is undefined",
      });
      return; // Exit the saga if the API response is undefined
    }

    // Log the API response for debugging purposes
    // This can help in troubleshooting issues by providing insights into the data returned by the API
    console.log("API response: ", response.data);

    // Destructure the necessary fields from the API response
    // This assumes the API returns an object with id, first_name, and last_name fields
    const { id, first_name, last_name } = response.data;

    // Check if both first_name and last_name are present in the API response
    // This validation ensures that the necessary data is available before proceeding
    if (first_name && last_name) {
      // Dispatch a success action with the relevant data
      // This allows the application to update the state accordingly (e.g., add the new loved one to the list)
      yield put({
        type: CREATE_LOVED_ONE_SUCCESS,
        payload: { lovedOneId: id, first_name, last_name },
      });
    } else {
      // Log an error if the necessary fields are missing in the API response
      // This could indicate an issue with the API or the data sent in the request
      console.error(
        "Missing first_name or last_name in API response:",
        response.data
      );
      // Dispatch a failure action with an error message
      // This allows the application to handle the error appropriately
      yield put({
        type: CREATE_LOVED_ONE_FAILURE,
        error: "Missing data in API response",
      });
    }
  } catch (error) {
    // Handle any errors that occur during the saga execution
    // This includes API call failures, network issues, or unexpected exceptions
    // The handleError function is called to log the error and dispatch a failure action
    yield* handleError(error, CREATE_LOVED_ONE_FAILURE);
  }
}

// Saga to handle updates to a loved one

// Selector to get lovedOneId from the state
const getLovedOneId = state => state.lovedOne.id;

function* updateLovedOneSaga(action) {
  try {
    // Retrieve lovedOneId from the state
    const stateLovedOneId = yield select(getLovedOneId);
    // Validate the stateLovedOneId just like the payload's lovedOneId
    // Ensure it's not null and is a valid integer
    // If validation fails, use yield put to dispatch failure action

    // Assuming validation passed and stateLovedOneId is used:
    const { ...updates } = action.payload;
    const payloadForAPI = { loved_one_id: stateLovedOneId, ...updates };

    // Use the structured payload in the API call
    const response = yield call(updateLovedOneApi, stateLovedOneId, payloadForAPI);

    // Dispatch the success action with the updated loved one data
    yield put({ type: UPDATE_LOVED_ONE_SUCCESS, payload: response.data });
  } catch (error) {
    yield* handleError(error, UPDATE_LOVED_ONE_FAILURE);
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

// Saga to store name info
function* storeLovedOneNameInfoSaga(action) {
  try {
    // Simulate success scenario
    const { first_name, last_name } = action.payload;
    if (!first_name || !last_name) {
      throw new Error('Missing name information');
    }
    yield put({
      type: STORE_LOVED_ONE_NAME_INFO_SUCCESS,
      payload: { first_name, last_name },
    });
  } catch (error) {
    yield put({
      type: STORE_LOVED_ONE_NAME_INFO_FAILURE,
      error: error.message,
    });
  }
}

// Saga to store address info
function* storeLovedOneAddressInfoSaga(action) {
  try {
    // Simulate success scenario
    const address  = action.payload;
    if (!address) {
      throw new Error('Missing address information');
    }
    yield put({
      type: STORE_LOVED_ONE_ADDRESS_INFO_SUCCESS,
      payload:{...address,}
    });
  } catch (error) {
    yield put({
      type: STORE_LOVED_ONE_ADDRESS_INFO_FAILURE,
      error: error.message,
    });
  }
}

// Saga to store detail info
function* storeLovedOneDetailInfoSaga(action) {
  try {
    // Simulate success scenario
    const details= action.payload;
    console.log(action.payload);
    console.log(details);
    if (!details) {
      throw new Error('Missing detail information');
    }
    yield put({
      type: STORE_LOVED_ONE_DETAIL_INFO_SUCCESS,
      payload:{...details} ,
    });
  } catch (error) {
    yield put({
      type: STORE_LOVED_ONE_DETAIL_INFO_FAILURE,
      error: error.message,
    });
  }
}

// Root saga that listens for actions and delegates to specific sagas
// Using takeLatest to cancel any ongoing saga if the action is dispatched again
export default function* rootSaga() {
  yield takeLatest(CREATE_LOVED_ONE_REQUEST, createLovedOneSaga);
  yield takeLatest(UPDATE_LOVED_ONE_REQUEST, updateLovedOneSaga);
  yield takeLatest(GET_LOVED_ONE_REQUEST, getLovedOneSaga);
  yield takeLatest(REMOVE_LOVED_ONE_REQUEST, removeLovedOneSaga);
  yield takeLatest(STORE_LOVED_ONE_NAME_INFO_REQUEST, storeLovedOneNameInfoSaga);
  yield takeLatest(STORE_LOVED_ONE_ADDRESS_INFO_REQUEST, storeLovedOneAddressInfoSaga);
  yield takeLatest(STORE_LOVED_ONE_DETAIL_INFO_REQUEST, storeLovedOneDetailInfoSaga);
}