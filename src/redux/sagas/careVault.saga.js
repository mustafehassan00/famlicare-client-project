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

import axios from "axios";
import { put, takeLatest, call } from "redux-saga/effects";

// Handles the file upload process
// Troubleshooting: Ensure the API endpoint is correct and the server accepts multipart/form-data
function* uploadFiles(action) {
  try {
    const formData = new FormData();
    formData.append("file", action.payload.file); // Ensure file is appended correctly
    formData.append("lovedOneId", action.payload.lovedOneId); // Ensure lovedOneId is appended correctly

    // Maintenance: Update the API endpoint as needed
    const response = yield axios.post("/api/care-vault/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    yield put({ type: "UPLOAD_SUCCESS", payload: response.data });
  } catch (error) {
    console.error("File upload failed", error); // Log for troubleshooting
    yield put({ type: "UPLOAD_FAILURE", payload: error });
  }
}

// Handles the file deletion process
// Troubleshooting: Check for correct ID and server permissions
function* deleteFiles(action) {
  try {
    // Maintenance: Update the API endpoint as needed
    yield axios.delete(`/api/care-vault/delete/${action.payload.id}`);

    yield put({ type: "DELETE_SUCCESS", payload: action.payload.id });
    yield put({ type: "FETCH_FILES" }); // Refresh file list after deletion
  } catch (error) {
    console.error("File deletion failed", error); // Log for troubleshooting
    yield put({ type: "DELETE_FAILURE", payload: error });
  }
}

// Fetches the list of files
// Troubleshooting: Verify the API endpoint and network connectivity
function* fetchFiles() {
  try {
    // Maintenance: Update the API endpoint as needed
    const response = yield axios.get("/api/care-vault/files");

    yield put({ type: "SET_FILES", payload: response.data });
  } catch (error) {
    console.error("File fetch failed", error); // Log for troubleshooting
    yield put({ type: "FETCH_FILES_FAILURE", payload: error });
  }
}

// Handles the file download process
// Troubleshooting: Ensure blob handling and URL creation are supported by the browser
function* downloadFiles(action) {
  try {
    yield put({ type: "DOWNLOAD_START" });

    // Maintenance: Update the API endpoint as needed
    const response = yield call(
      axios.get,
      `/api/care-vault/download/${action.payload.id}`,
      {
        responseType: "blob", // Ensure server responds with a blob
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", action.payload.fileName); // Ensure the file name is set correctly
    document.body.appendChild(link); // Append to body to ensure visibility in all browsers
    link.click();
    document.body.removeChild(link); // Clean up by removing the link
    window.URL.revokeObjectURL(url); // Free up memory by revoking the blob URL

    yield put({ type: "DOWNLOAD_SUCCESS" });
  } catch (error) {
    console.error("File download failed", error); // Log for troubleshooting
    yield put({ type: "DOWNLOAD_FAILURE", payload: error });
  }
}

// Handles the file sharing process
// Troubleshooting: Verify the payload and server's response to sharing requests
function* shareFiles(action) {
  try {
    // Maintenance: Update the API endpoint and payload structure as needed
    const response = yield axios.post(`/api/care-vault/share/${action.payload.id}`, {
      // Include any necessary data for sharing, e.g., user IDs or permissions
    });

    yield put({ type: "SHARE_SUCCESS", payload: response.data });
  } catch (error) {
    console.error("File sharing failed", error); // Log for troubleshooting
    yield put({ type: "SHARE_FAILURE", payload: error });
  }
}

// Saga function for viewing files
// Troubleshooting: Ensure the file ID is correct and the server is properly configured to serve file data
function* viewFiles(action) {
  try {
    // Maintenance: Update the API endpoint as needed
    const response = yield axios.get(`/api/care-vault/files/${action.payload.id}`);
    yield put({ type: "VIEW_FILES_SUCCESS", payload: response.data });
  } catch (error) {
    console.error("Viewing file failed", error); // Log for troubleshooting
    yield put({ type: "VIEW_FILES_FAILURE", payload: error });
  }
}

function* careVaultSaga() {
  yield takeLatest("UPLOAD_FILES", uploadFiles);
  yield takeLatest("DELETE_FILES", deleteFiles);
  yield takeLatest("FETCH_FILES", fetchFiles);
  yield takeLatest("DOWNLOAD_FILES", downloadFiles);
  yield takeLatest("SHARE_FILES", shareFiles);
  yield takeLatest("VIEW_FILES", viewFiles); 
}

export default careVaultSaga;