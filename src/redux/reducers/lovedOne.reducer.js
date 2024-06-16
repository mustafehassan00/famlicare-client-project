//Imports
import {
  CREATE_LOVED_ONE_REQUEST,
  UPDATE_LOVED_ONE_REQUEST,
  UPDATE_USER_TABLE_REQUEST,
  CREATE_LOVED_ONE_SUCCESS,
  CREATE_LOVED_ONE_FAILURE,
  UPDATE_LOVED_ONE_SUCCESS,
  UPDATE_LOVED_ONE_FAILURE,
  UPDATE_USER_TABLE_SUCCESS,
  UPDATE_USER_TABLE_FAILURE,
} from "./actions/lovedOne.actions";

// initialState to including possible error messages and a loading state
const initialState = {
  first_name: "",
  last_name: "",
  age: "",
  main_condition: "",
  street_address: "",
  street_address2: "",
  city: "",
  state_province: "",
  country: "",
  postal_code: "",
  loading: false,
  error: null,
};

// The reducer function for lovedOne state updates
const lovedOne = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_LOVED_ONE_REQUEST:
    case UPDATE_LOVED_ONE_REQUEST:
    case UPDATE_USER_TABLE_REQUEST:
      // Set loading to true at the start of these operations
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_LOVED_ONE_SUCCESS:
    case UPDATE_LOVED_ONE_SUCCESS:
      // On success, update the state with the new loved one's data and stop loading
      return {
        ...state,
        ...action.payload,
        loading: false,
      };

    case UPDATE_USER_TABLE_SUCCESS:
      // Assuming updateUserTableApi might not change loved one's info directly
      // Just stop loading and clear errors
      return {
        ...state,
        loading: false,
        error: null,
      };

    case CREATE_LOVED_ONE_FAILURE:
    case UPDATE_LOVED_ONE_FAILURE:
    case UPDATE_USER_TABLE_FAILURE:
      // On failure, stop loading and update the error message
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      // Returns the current state if no action matches
      return state;
  }
};

// Export the reducer
export default lovedOne;
