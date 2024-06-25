import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

/**
 * Saga to handle sending an email to an invited user.
 * This function listens for the SEND_EMAIL_TO_INVITED_USER action,
 * makes a POST request to the server with the invitation details,
 * and dispatches either an INVITATION_SENT or SET_ERROR action based on the request's outcome.
 * 
 * @param {Object} action - The action object containing the payload with invitation details.
 */
function* sendEmailToInvitedUser(action) {
  try {
    // Attempt to send the invitation email via a POST request
    yield call(axios.post, '/api/care-team', action.payload);
    // On success, dispatch INVITATION_SENT to update the application state
    yield put({ type: 'INVITATION_SENT' });
  } catch (error) {
    // Log the error and dispatch SET_ERROR with a message on failure
    console.log('Error sending email in careTeam saga', error);
    yield put({ type: 'SET_ERROR', payload: 'Failed to send invitation email' });
  }
}

/**
 * Saga to handle the verification of an invitation code.
 * Listens for the VERIFY_INVITATION_CODE action, makes a POST request to verify the code,
 * and updates the state based on the response.
 * 
 * @param {Object} action - The action object containing the payload with the invitation code.
 */
function* verifyInvitationCode(action) {
  try {
    // Attempt to verify the invitation code via a POST request
    const response = yield call(
      axios.post,
      '/api/care-team/verify-invitation',
      action.payload
    );
    if (response.status === 200) {
      // On successful verification, update the loved one's information in the state
      yield put({ type: 'SET_LOVED_ONE', payload: response.data });
      // Dispatch VERIFICATION_SUCCESSFUL to indicate a successful verification process
      yield put({ type: 'VERIFICATION_SUCCESSFUL' });
    }
  } catch (error) {
    // Log the error and dispatch SET_ERROR with a message on failure
    console.log('Error verifying invitation code:', error);
    yield put({ type: 'SET_ERROR', payload: 'Invalid invitation code' });
  }
}

/**
 * The main saga that listens for actions related to the care team functionalities.
 * It watches for SEND_EMAIL_TO_INVITED_USER and VERIFY_INVITATION_CODE actions
 * and calls the respective worker sagas.
 */
function* careTeamSaga() {
  yield takeLatest('SEND_EMAIL_TO_INVITED_USER', sendEmailToInvitedUser);
  yield takeLatest('VERIFY_INVITATION_CODE', verifyInvitationCode);
}

export default careTeamSaga;