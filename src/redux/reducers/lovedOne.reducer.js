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
  AUTHORIZATION_FAILURE,
  // Assuming STORE actions are defined here
  STORE_LOVED_ONE_NAME_INFO_SUCCESS,
  STORE_LOVED_ONE_ADDRESS_INFO_SUCCESS,
  STORE_LOVED_ONE_DETAIL_INFO_SUCCESS,
} from "./actions/lovedOne.actions";

// initialState to include possible error messages and a loading state
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

// Helper function to reset lovedOne to its initial state
const resetLovedOne = () => ({
  id: null,
  first_name: "",
  last_name: "",
  age: null,
  main_condition: "",
  street_address: "",
  street_address2: "",
  city: "",
  state_province: "",
  country: "",
  postal_code: "",
});

// The reducer function for lovedOne state updates
const lovedOneReducer = (state = initialState, action) => {
  switch (action.type) {
    // Handle request actions by setting loading state
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
    case CREATE_LOVED_ONE_SUCCESS:
      if (typeof action.payload.lovedOneId === "undefined") {
        return {
          ...state,
          loading: false,
          error: "Invalid lovedOneId: undefined",
        };
      }
      return {
        ...state,
        id: action.payload.lovedOneId,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        loading: false,
      };

    // Handle successful update of a loved one
    case UPDATE_LOVED_ONE_SUCCESS:
      if (state.id === action.payload.lovedOneId) {
        return {
          ...state,
          ...action.payload.data,
          loading: false,
        };
      }
      return state;

    // Handle successful retrieval of a loved one's details
    case GET_LOVED_ONE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };

    // Handle successful removal of a loved one
    case REMOVE_LOVED_ONE_SUCCESS:
      return {
        ...state,
        ...resetLovedOne(),
        loading: false,
      };

    // Handle failures by updating error state
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
    case AUTHORIZATION_FAILURE:
      return {
        ...initialState,
        error: "Authorization failed. Please log in again.",
      };

    // Handle STORE actions for updating parts of the state
    case STORE_LOVED_ONE_NAME_INFO_SUCCESS:
      return {
        ...state,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
      };

    case STORE_LOVED_ONE_ADDRESS_INFO_SUCCESS:
      return {
        ...state,
        street_address: action.payload.street_address,
        street_address2: action.payload.street_address2,
        city: action.payload.city,
        state_province: action.payload.state_province,
        country: action.payload.country,
        postal_code: action.payload.postal_code,
      };

    case STORE_LOVED_ONE_DETAIL_INFO_SUCCESS:
      return {
        ...state,
        age: action.payload.age,
        main_condition: action.payload.main_condition,
      };

    default:
      return state;
  }
};

// Export the reducer
export default lovedOneReducer;