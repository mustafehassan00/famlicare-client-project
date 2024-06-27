/**
 * This file contains saga middleware functions for handling asynchronous actions related to the care vault feature.
 */

import { put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";

// Base URL for the care vault API endpoints. Update this if the API location changes.
const API_BASE_URL = "/api/care-vault";

/**
 * Saga to handle file uploads.
 * @param {Object} action - The action object containing the file and lovedOneId.
 * Troubleshooting: Ensure the formData is correctly formatted and the API endpoint is reachable.
 */
function* uploadFiles(action) {
  try {
    const formData = new FormData();
    formData.append("file", action.payload.file);
    formData.append("lovedOneId", action.payload.lovedOneId);

    const response = yield call(axios.post, `${API_BASE_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    yield put({ type: "UPLOAD_SUCCESS", payload: response.data.file });
    yield put({ type: "FETCH_FILES" });
  } catch (error) {
    console.error("File upload failed", error);
    yield put({ type: "UPLOAD_FAILURE", payload: error.message });
    // Maintenance: Check for network issues or server-side errors if uploads fail.
  }
}

/**
 * Saga to handle file deletions.
 * @param {Object} action - The action object containing the file ID to delete.
 * Troubleshooting: Verify the file ID exists and the API endpoint is correct.
 */
function* deleteFiles(action) {
  try {
    yield call(axios.delete, `${API_BASE_URL}/delete/${action.payload.id}`);
    yield put({ type: "DELETE_SUCCESS", payload: action.payload.id });
    yield put({ type: "FETCH_FILES" });
  } catch (error) {
    console.error("File deletion failed", error);
    yield put({ type: "DELETE_FAILURE", payload: error.message });
    // Maintenance: Ensure the file ID is valid and the backend service is operational.
  }
}

/**
 * Saga to fetch the list of files.
 * Troubleshooting: Check API endpoint and network connectivity if files are not fetched.
 */
function* fetchFiles() {
  try {
    const response = yield call(axios.get, `${API_BASE_URL}/files`);
    yield put({ type: "SET_FILES", payload: response.data });
  } catch (error) {
    console.error("File fetch failed", error);
    yield put({ type: "FETCH_FILES_FAILURE", payload: error.message });
    // Maintenance: Verify the API service is up and running.
  }
}

/**
 * Saga to get a pre-signed URL for a file.
 * @param {Object} action - The action object containing the file ID and useType.
 * Troubleshooting: Ensure the file ID is correct and the useType parameter is valid ('view' or 'download').
 */
function* getFileUrl(action) {
  try {
    console.log('action.payload is:', action.payload)
    const response = yield call(axios.get, `${API_BASE_URL}/file/${action.payload.id}?useType=${action.payload.useType || 'view'}`);
    yield put({ type: "SET_FILE_URL", payload: response.data });
  } catch (error) {
    console.error("Failed to get file URL", error);
    yield put({ type: "SET_FILE_ERROR", payload: error.message });
    // Maintenance: Check for correct useType parameter and file ID validity.
  }
}

/**
 * Main saga function that listens for actions and delegates to specific handlers.
 * Maintenance: Add new action listeners as needed for additional functionality.
 */
function* careVaultSaga() {
  yield takeLatest("UPLOAD_FILES", uploadFiles);
  yield takeLatest("DELETE_FILES", deleteFiles);
  yield takeLatest("FETCH_FILES", fetchFiles);
  yield takeLatest("GET_FILE_URL", getFileUrl);
}

export default careVaultSaga;