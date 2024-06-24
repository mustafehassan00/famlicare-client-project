import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: "CLEAR_REGISTRATION_ERROR" });
    // passes the username and password from the payload to the server
    yield axios.post("/api/user/register", action.payload);
    console.log("We are in the SAGA!", action.payload);
    //     // pullling username and password from this object
    //
    // registerReducer: {
    // username: 'jamal',
    // emailAddress: 'yam',
    // password: '123456',
    // phoneNumber: '47771234',
    // image: '',
    // firstName: 'Jamal',
    // lastName: 'Syed'
    // }
    // const username = req.body.registerReducer.username;
    // const password = req.body.registerReducer.password;
    const { username, password } = action.payload.registerReducer;
    console.log("WE ARE IN the SAGA longin data", username, password);
    // // Only send username and password to the login saga
    // const requestedData = { username, password };
    // automatically log a user in after registration
    yield put({ type: "LOGIN", payload: { username, password } });
    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({ type: "SET_TO_LOGIN_MODE" });
  } catch (error) {
    console.log("Error with user registration:", error);
    yield put({ type: "REGISTRATION_FAILED" });
  }
}

function* registrationSaga() {
  yield takeLatest("REGISTER", registerUser);
}

export default registrationSaga;
