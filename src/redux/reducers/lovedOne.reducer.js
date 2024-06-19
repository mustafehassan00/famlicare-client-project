//Imports
import {
  // Action types for CRUD operations and authorization
  CREATE_LOVED_ONE_REQUEST,
  CREATE_LOVED_ONE_SUCCESS,
  CREATE_LOVED_ONE_FAILURE,
  UPDATE_LOVED_ONE_REQUEST,
  UPDATE_LOVED_ONE_SUCCESS,
  UPDATE_LOVED_ONE_FAILURE,
  GET_LOVED_ONE_REQUEST,
  GET_LOVED_ONE_SUCCESS,
  GET_LOVED_ONE_FAILURE,
  REMOVE_LOVED_ONE_REQUEST,
  REMOVE_LOVED_ONE_SUCCESS,
  REMOVE_LOVED_ONE_FAILURE,
  AUTHORIZATION_FAILURE,
  // Action types for storing partial loved one information
  STORE_LOVED_ONE_NAME_INFO_SUCCESS,
  STORE_LOVED_ONE_ADDRESS_INFO_SUCCESS,
  STORE_LOVED_ONE_DETAIL_INFO_SUCCESS,
} from "./actions/lovedOne.actions";

// Initial state of the lovedOne entity
const initialState = {
  // Basic information
  id: "",
  first_name: "",
  last_name: "",
  age: "",
  main_condition: "",
  // Address information
  street_address: "",
  street_address2: "",
  city: "",
  state_province: "",
  country: "",
  postal_code: "",
  // UI states
  loading: false,
  error: null,
  createdSuccessfully: null,
};

// Helper function to reset lovedOne to its initial state
// Useful for ensuring a clean state after a loved one is removed
const resetLovedOne = () => ({
  ...initialState,
  id: null,
  age: null,
});

// The reducer function for lovedOne state updates
// Handles actions dispatched throughout the application lifecycle
const lovedOneReducer = (state = initialState, action) => {
  switch (action.type) {
    // Handle request actions by setting loading state
    // Useful for showing loading indicators in the UI
    // Clears any previous errors to ensure a clean state for new operations
    case CREATE_LOVED_ONE_REQUEST:
    case UPDATE_LOVED_ONE_REQUEST:
    case GET_LOVED_ONE_REQUEST:
    case REMOVE_LOVED_ONE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Handle successful creation of a loved one
    // Assumes action.payload contains all loved one information including a unique ID
    // Enhances error handling for cases where lovedOneId might be missing or invalid
    case CREATE_LOVED_ONE_SUCCESS:
      if (!action.payload.lovedOneId) {
        return {
          ...state,
          loading: false,
          error: "Invalid lovedOneId: value is falsy",
        };
      }
      return {
        ...state,
        ...action.payload,
        id: action.payload.id,
        loading: false,
        createdSuccessfully:true,
      };

    // Handle successful update of a loved one
    // Assumes action.payload contains updated loved one information and a matching ID
    // Only updates state if the current loved one's ID matches the payload's ID
    case UPDATE_LOVED_ONE_SUCCESS:
      if (state.id === action.payload.lovedOneId) {
        return {
          ...state,
          ...action.payload.data,
          loading: false,
        };
      }
      // If the IDs do not match, it silently ignores the update
      // This might be a place to handle unexpected behavior or log a warning
      return state;

    // Handle successful retrieval of a loved one's details
    // Assumes action.payload contains all relevant information of the loved one
    case GET_LOVED_ONE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };

    // Handle successful removal of a loved one
    // Resets the state to ensure no residual data remains
    // Uses resetLovedOne helper function for a clean state reset
    case REMOVE_LOVED_ONE_SUCCESS:
      return {
        ...resetLovedOne(),
        loading: false,
      };

    // Handle failures by updating error state
    // Centralizes error handling for CRUD operations
    // Assumes action.payload.error contains a meaningful error message
    case CREATE_LOVED_ONE_FAILURE:
    case UPDATE_LOVED_ONE_FAILURE:
    case GET_LOVED_ONE_FAILURE:
    case REMOVE_LOVED_ONE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    // Handle authorization failures
    // Resets the state to initial to prevent unauthorized access to data
    // Sets a specific error message for authorization failures
    case AUTHORIZATION_FAILURE:
      return {
        ...initialState,
        error: "Authorization failed. Please log in again.",
      };

    // Handle STORE actions for updating parts of the state
    // Allows for partial updates to the loved one's information
    // Assumes action.payload contains only the information relevant to the specific STORE action
    case STORE_LOVED_ONE_NAME_INFO_SUCCESS:
    case STORE_LOVED_ONE_ADDRESS_INFO_SUCCESS:
    case STORE_LOVED_ONE_DETAIL_INFO_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      // Returns the current state for any unhandled actions
      // Important for maintaining the integrity of the state in case of unknown actions
      return state;
  }
};

// Export the reducer for use in the store configuration
export default lovedOneReducer;