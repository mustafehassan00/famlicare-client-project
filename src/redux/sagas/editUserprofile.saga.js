import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";


function* editUserprofile(action) {
  try {
    // get the data of the user we are editing
    const idofUser = action.payload
    console.log('id of user profile edit in SAGA',idofUser)
    const response = yield axios ({
        method: 'GET',
        url: `/api/user/${idofUser}`
    })
    // dispatch the user's info retrieved to the editUser reducer 
    const userToeditData = response.data
    console.log('response from db for use profile to EDIT in saga',userToeditData)
    yield put({ type: "SET-USER-TO-EDIT", payload: userToeditData });
  } catch (error) {
    console.log("Error with user profile edit!:", error);
  }
}

function* editUsersaga() {
  yield takeLatest("EDIT-USER-PROFILE", editUserprofile);
}

export default editUsersaga;