import axios from "axios";
import { put, takeLatest, call } from "redux-saga/effects";

function* uploadFiles(action) {
  try {
    const formData = new FormData();
    formData.append("file", action.payload.file);
    formData.append("lovedOneId", action.payload.lovedOneId);

    const response = yield axios.post("/api/care-vault/upload", formData);

    yield put({ type: "UPLOAD_SUCCESS", payload: response.data });
  } catch (error) {
    console.log("File upload failed", error);
  }
}

function* deleteFiles(action) {
  try {
    yield axios.delete(`/api/care-vault/delete/${action.payload.id}`);
    yield put({ type: "DELETE_SUCCESS", payload: action.payload.id });
  } catch (error) {
    console.log("File deletion failed", error);
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

function* downloadFiles(action) {
  try {
    yield put({ type: "DOWNLOAD_START" });
    const response = yield call(
      axios.get,
      `/api/care-vault/download/${action.payload.id}`,
      {
        responseType: "blob",
      }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", action.payload.fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    yield put({ type: "DOWNLOAD_SUCCESS" });
  } catch (error) {
    console.log("File download failed", error);
  }
}

function* careVaultSaga() {
  yield takeLatest("UPLOAD_FILES", uploadFiles);
  yield takeLatest("DELETE_FILES", deleteFiles);
  yield takeLatest("FETCH_FILES", fetchFiles);
  yield takeLatest("DOWNLOAD_FILES", downloadFiles);
}

export default careVaultSaga;
