/**
 * careVault Reducer
 * 
 * This reducer manages the state for the CareVault feature.
 * 
 * Troubleshooting:
 * - If state updates are not reflecting in the UI, check action types and payload structures.
 * - Use Redux DevTools to inspect state changes and action dispatches.
 * 
 * Maintenance:
 * - Add new cases as new features are implemented.
 * - Consider splitting into smaller reducers if it grows too large.
 */

// Initial state of the careVault reducer. This state includes:
// - files: an array to store file objects
// - error: to capture any errors from operations
// - isDownloading: flag to indicate if a download operation is in progress
// - isSharing: flag to indicate if a sharing operation is in progress
const initialState = {
  files: [],
  error: null,
  isDownloading: false, // Optional: Manage download state
  isSharing: false, // Optional: Manage share state
};

// The careVault reducer function handles actions related to file operations
// such as uploading, deleting, fetching, downloading, and sharing files.
const careVault = (state = initialState, action) => {
  switch (action.type) {
    case "UPLOAD_SUCCESS":
      // On successful upload, add the new file to the files array.
      // Troubleshooting: Ensure the payload contains the file object to be added.
      return {
        ...state,
        files: [...state.files, action.payload],
        error: null,
      };
    case "UPLOAD_FAILURE":
    case "DELETE_FAILURE":
    case "FETCH_FILES_FAILURE":
    case "DOWNLOAD_FAILURE":
    case "SHARE_FAILURE":
    case "VIEW_FILES_FAILURE":
      // On any failure, set the error state to the error provided in the action's payload.
      // Troubleshooting: Check the action's payload for error details.
      return {
        ...state,
        error: action.payload, // Updated to use action.payload for error
      };
    case "DELETE_SUCCESS":
      // On successful delete, remove the file from the files array using its id.
      // Troubleshooting: Ensure the payload contains the id of the file to be removed.
      return {
        ...state,
        files: state.files.filter((file) => file.id !== action.payload),
        error: null,
      };
    case "SET_FILES":
      // Action to set the files array to a new array of files.
      // Useful for initializing or refreshing the files list.
      // Troubleshooting: Verify the payload contains an array of file objects.
      console.log('files being set in Redux:', action.payload);  
      return {
        ...state,
        files: action.payload,
      };
    case "DOWNLOAD_START":
      // Indicates the start of a download operation.
      // Maintenance: If download operations are expanded, consider adding more specific flags or states.
      return {
        ...state,
        isDownloading: true, // Optional: Reflect download start
      };
    case "DOWNLOAD_SUCCESS":
      // Indicates the successful completion of a download operation.
      // Maintenance: Update handling here if download results need to be tracked.
      return {
        ...state,
        isDownloading: false, // Optional: Reflect download success
      };
    case "SHARE_SUCCESS":
      // Handle share success if needed, e.g., update state or files.
      // Maintenance: Implement specific actions if sharing results need to be tracked or managed.
      return {
        ...state,
        isSharing: false, // Optional: Reflect share success
      };
    case "VIEW_FILES_SUCCESS":
      // Optionally handle viewing files success.
      // Maintenance: Implement if viewing files requires state updates or tracking.
      return state; // No change for now, adjust as needed
    default:
      // For any unhandled action types, return the current state.
      return state;
  }
};

export default careVault;