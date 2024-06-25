import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
// This saga handles fetching user data from the server
function* fetchUser() {
  try {
    // Configuration for axios request, including credentials for authentication
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true, // Important for sessions or cookie-based authentication
    };

    // Perform a GET request to fetch user data
    const response = yield call(axios.get, '/api/user', config);
    // Dispatch SET_USER action with fetched data as payload
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    // Log errors to the console for troubleshooting
    console.log('User get request failed', error);
  }
}

// Saga to handle user updates
// This saga is triggered by the "UPDATE_USER" action
function* updateUser(action) {
  try {
    // Configuration for axios request, similar to fetchUser saga
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // Perform a PUT request to update user data on the server
    yield call(axios.put, '/api/user', action.payload, config);
    // After successful update, fetch user data again to refresh the state
    yield put({ type: 'FETCH_USER' });
  } catch (error) {
    // Log errors to the console for troubleshooting
    console.log('User update request failed', error);
  }
}

// Root saga for user-related actions
// Listens for "FETCH_USER" and "UPDATE_USER" actions and calls the appropriate saga
function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('UPDATE_USER', updateUser);
}

export default userSaga;