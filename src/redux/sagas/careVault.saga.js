import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* uploadFile(action) {
  try {
    const formData = new FormData();
    formData.append("file", action.payload.file);
    formData.append("lovedOneId", action.payload.lovedOneId);

    const response = yield axios.post("/api/care-vault/upload", formData);

    yield put({ type: "UPLOAD_SUCCESS", payload: response.data });
  } catch (error) {
    console.log("File upload failed", error);
    yield put({ type: "UPLOAD_FAILURE", error });
  }
}

function* deleteFile(action) {
  try {
    yield axios.delete(`/api/care-vault/delete/${action.payload.id}`);
    yield put({ type: "DELETE_SUCCESS", payload: action.payload.id });
  } catch (error) {
    console.log("File deletion failed", error);
    yield put({ type: "DELETE_FAILURE", error });
  }
}

function* fetchFiles() {
  try {
    const response = yield axios.get("/api/care-vault/files");
    yield put({ type: "SET_FILES", payload: response.data });
  } catch (error) {
    console.log("File fetch failed", error);
  }
}

function* careVaultSaga() {
  yield takeLatest("UPLOAD_FILE", uploadFile);
  yield takeLatest("DELETE_FILE", deleteFile);
  yield takeLatest("FETCH_FILES", fetchFiles);
}

export default careVaultSaga;
