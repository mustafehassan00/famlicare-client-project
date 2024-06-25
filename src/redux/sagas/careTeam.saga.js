import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* careTeam(action) {
  try {
    const response = yield axios.post("/api/care-team", action.payload);
    console.log("invited users email post route sent");
  } catch (error) {
    console.log("error sending email in careTeam saga", error);
  }
}

// worker Saga: will be fired on "VERIFY_INVITATION_CODE" actions
function* verifyInvitationCode(action) {
  try {
    const response = yield call(
      axios.post,
      "/api/care-team/verify-invitation",
      action.payload
    );
    if (response.status === 200) {
      yield put({ type: "SET_LOVED_ONE", payload: response.data });
      // Dispatch a custom action for navigation
      yield put({ type: "NAVIGATE", payload: "/care-team-dashboard" });
    }
  } catch (error) {
    console.log("Error verifying invitation code:", error);
    yield put({ type: "SET_ERROR", payload: "Invalid invitation code" });
  }
}

// Root saga combines both sagas under a single main saga
function* careTeamSaga() {
  yield takeLatest("SEND_EMAIL_TO_INVITED_USER", careTeam);
  yield takeLatest("VERIFY_INVITATION_CODE", verifyInvitationCode);
}

export default careTeamSaga;
