//Imports
import {
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
  AUTHORIZATION_FAILURE
} from "./actions/lovedOne.actions";

// initialState to including possible error messages and a loading state
const initialState = {
  id: "",
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
    case GET_LOVED_ONE_REQUEST: 
    case REMOVE_LOVED_ONE_REQUEST: 
      // Set loading to true at the start of these operations
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_LOVED_ONE_SUCCESS:
      // update ID, first_name, and last_name
      return {
        ...state,
        id: action.payload.lovedOneId,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        loading: false,
      }

    case UPDATE_LOVED_ONE_SUCCESS:
      // On success, update the state with the new loved one's data and stop loading
      return {
        ...state,
        ...action.payload,
        loading: false,
      };

    case GET_LOVED_ONE_SUCCESS: 
      // On success, update the state with the retrieved loved one's data and stop loading
      return {
        ...state,
        ...action.payload,
        loading: false,
      };

    case REMOVE_LOVED_ONE_SUCCESS: 
      // On success, reset the state to initialState and stop loading
      return initialState;

    case CREATE_LOVED_ONE_FAILURE:
    case UPDATE_LOVED_ONE_FAILURE:
    case GET_LOVED_ONE_FAILURE: 
    case REMOVE_LOVED_ONE_FAILURE: 
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