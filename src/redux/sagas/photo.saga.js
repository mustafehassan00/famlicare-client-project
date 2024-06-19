import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* photo() {
  try {
    const config = {
      headers: { "content-type": "multipart/form-data" },
      withCredentials: true,
    };
    // declaring formData store the photo selected by user
    const formData = new FormData();
    formData.append("photo", selectedFile); // Append the file to FormData

    const response = yield axios.post("/api/user", formData, config);
    console.log("File uploaded successfully:", response.data);

   
  } catch (error) {
    console.log('failed to post photo', error);
    //handles error if it occurs
  }
}

function* photoSaga() {
  yield takeLatest('POST_PHOTO', photo);
}

export default photoSaga;