/**
 * careVault Saga
 * 
 * This saga handles asynchronous operations for the CareVault feature.
 * 
 * Troubleshooting:
 * - Check network tab in browser dev tools for API call issues.
 * - Ensure API endpoints match between frontend and backend.
 * - Verify CORS settings if experiencing cross-origin issues.
 * 
 * Maintenance:
 * - Update API endpoints as backend routes change.
 * - Consider implementing request cancellation for long-running operations.
 */

// careVault.saga.js

import { put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";

// Handles file upload
function* uploadFiles(action) {
  try {
    const formData = new FormData();
    formData.append("file", action.payload.file);
    formData.append("lovedOneId", action.payload.lovedOneId);

    const response = yield call(axios.post, "/api/care-vault/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    yield put({ type: "UPLOAD_SUCCESS", payload: response.data.file });
    yield put({ type: "FETCH_FILES" });
  } catch (error) {
    console.error("File upload failed", error);
    yield put({ type: "UPLOAD_FAILURE", payload: error.message });
  }
}

// Handles file deletion
function* deleteFiles(action) {
  try {
    yield call(axios.delete, `/api/care-vault/delete/${action.payload.id}`);
    yield put({ type: "DELETE_SUCCESS", payload: action.payload.id });
    yield put({ type: "FETCH_FILES" });
  } catch (error) {
    console.error("File deletion failed", error);
    yield put({ type: "DELETE_FAILURE", payload: error.message });
  }
}

// Fetches the list of files
function* fetchFiles() {
  try {
    const response = yield call(axios.get, "/api/care-vault/files");
    yield put({ type: "SET_FILES", payload: response.data });
  } catch (error) {
    console.error("File fetch failed", error);
    yield put({ type: "FETCH_FILES_FAILURE", payload: error.message });
  }
}

// Handles getting a pre-signed URL for a file
function* getFileUrl(action) {
  try {
    const response = yield call(axios.get, `/api/care-vault/file/${action.payload.id}`);
    yield put({ type: "SET_FILE_URL", payload: response.data });
  } catch (error) {
    console.error("Failed to get file URL", error);
    yield put({ type: "SET_FILE_ERROR", payload: error.message });
  }
}

function* careVaultSaga() {
  yield takeLatest("UPLOAD_FILES", uploadFiles);
  yield takeLatest("DELETE_FILES", deleteFiles);
  yield takeLatest("FETCH_FILES", fetchFiles);
  yield takeLatest("GET_FILE_URL", getFileUrl);
}

export default careVaultSaga;