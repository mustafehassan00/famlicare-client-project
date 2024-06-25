import axios from 'axios';
import { call, put, takeLatest, select } from 'redux-saga/effects';

/**
 * Saga to handle sending an email to an invited user.
 * This function listens for the SEND_EMAIL_TO_INVITED_USER action,
 * makes a POST request to the server with the invitation details,
 * and dispatches either an INVITATION_SENT or SET_ERROR action based on the request's outcome.
 * 
 * Troubleshooting:
 * - Ensure the server endpoint '/api/care-team' is correctly set up to handle POST requests.
 * - Check the network request in the browser's developer tools for errors.
 * 
 * @param {Object} action - The action object containing the payload with invitation details.
 */
function* sendEmailToInvitedUser(action) {
  try {
    yield call(axios.post, '/api/care-team', action.payload);
    // On success, dispatch FETCH_CARE_TEAM_MEMBERS to refresh the team members list
    yield put({ type: 'FETCH_CARE_TEAM_MEMBERS' });
  } catch (error) {
    console.log('Error sending email in careTeam saga', error);
    // Dispatch SET_ERROR with a message on failure
    yield put({ type: 'SET_ERROR', payload: 'Failed to send invitation email' });
  }
}

/**
 * Saga to handle the verification of an invitation code.
 * Listens for the VERIFY_INVITATION_CODE action, makes a POST request to verify the code,
 * and updates the state based on the response.
 * 
 * Troubleshooting:
 * - Verify the server endpoint '/api/care-team/verify-invitation' is correctly implemented.
 * - Check the response status code for errors.
 * 
 * @param {Object} action - The action object containing the payload with the invitation code.
 */
function* verifyInvitationCode(action) {
  try {
    const response = yield call(
      axios.post,
      '/api/care-team/verify-invitation',
      action.payload
    );
    if (response.status === 200) {
      yield put({ type: 'SET_LOVED_ONE', payload: response.data });
      yield put({ type: 'VERIFICATION_SUCCESSFUL' });
    }
  } catch (error) {
    console.log('Error verifying invitation code:', error);
    yield put({ type: 'SET_ERROR', payload: 'Invalid invitation code' });
  }
}

/**
 * Saga to fetch care team members from the server.
 * This saga listens for the FETCH_CARE_TEAM_MEMBERS action, makes a GET request
 * to retrieve the care team members for the current user's loved one, and updates
 * the state with the retrieved data.
 * 
 * Troubleshooting:
 * - Ensure the server endpoint is correctly set up to handle GET requests for care team members.
 * - Check if the user's loved one ID is correctly being passed in the URL.
 * 
 */
function* fetchCareTeamMembers() {
    try {
        const user = yield select(state => state.user);
        const response = yield call(axios.get, `/api/care-team/members/${user.loved_one_id}`);
        yield put({ type: 'SET_CARE_TEAM_MEMBERS', payload: response.data });
    } catch (error) {
        console.log('Error fetching care team members:', error);
        yield put({ type: 'SET_ERROR', payload: 'Failed to fetch care team members' });
    }
}

/**
 * The main saga that listens for actions related to the care team functionalities.
 * It watches for specific actions and delegates the work to the respective worker sagas.
 * 
 * Troubleshooting:
 * - Ensure that all action types are correctly spelled and match those dispatched in the application.
 * - Verify that all worker sagas are correctly implemented and exported.
 */
function* careTeamSaga() {
  yield takeLatest('FETCH_CARE_TEAM_MEMBERS', fetchCareTeamMembers);
  yield takeLatest('SEND_EMAIL_TO_INVITED_USER', sendEmailToInvitedUser);
  yield takeLatest('VERIFY_INVITATION_CODE', verifyInvitationCode);
}

export default careTeamSaga;