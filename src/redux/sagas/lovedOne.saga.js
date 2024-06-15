import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

// Worker Saga: Triggered on "FETCH_LOVED_ONE" actions.
// This saga handles fetching a loved one's information.
function* fetchLovedOne() {
  try {
    // Configuration for the axios request.
    // Includes credentials for session authentication and JSON content type.
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true, // Ensures session cookies are sent with the request.
    };

    // Attempt to fetch the loved one's information from the server.
    // The server should recognize the user session and return the appropriate data.
    const response = yield axios.get('/api/loved_one', config);

    // Dispatch an action to update the state with the fetched loved one's information.
    // This lets the client-side code know which loved one is currently being viewed/managed.
    yield put({ type: 'SET_LOVED_ONE', payload: response.data });
  } catch (error) {
    // Log any errors to the console for debugging.
    // This is crucial for troubleshooting failed requests.
    console.log('Loved one fetch request failed', error);
  }
}

// The main saga that watches for "FETCH_LOVED_ONE" actions and delegates to the worker saga.
function* lovedOneSaga() {
  // Listen for "FETCH_LOVED_ONE" actions and call fetchLovedOne when one comes in.
  // This setup allows for easy addition of more actions and sagas as needed.
  yield takeLatest('FETCH_LOVED_ONE', fetchLovedOne);
}

// Export the saga to be used in the store's saga middleware.
export default lovedOneSaga;