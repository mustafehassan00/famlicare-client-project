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
} from "./actions/lovedOne.actions";

// initialState to include possible error messages and a loading state
const initialState = {
  lovedOne: {
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
  },
  loading: false,
  error: null,
};

// Helper function to reset lovedOne to its initial state
const resetLovedOne = () => ({
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
});

// The reducer function for lovedOne state updates
const lovedOneReducer = (state = initialState, action) => {
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
      // Validate lovedOneId is not undefined
      if (typeof action.payload.lovedOneId === "undefined") {
        return {
          ...state,
          loading: false,
          error: "Invalid lovedOneId: undefined",
        };
      }
      // Update lovedOne with ID, first_name, and last_name from payload
      return {
        ...state,
        lovedOne: {
          ...state.lovedOne,
          id: action.payload.lovedOneId,
          first_name: action.payload.first_name,
          last_name: action.payload.last_name,
        },
        loading: false,
      };

    case UPDATE_LOVED_ONE_SUCCESS:
      // Assuming action.payload contains { lovedOneId, data: { age, main_condition } }
      if (state.lovedOne.id === action.payload.lovedOneId) {
        return {
          ...state,
          lovedOne: {
            ...state.lovedOne,
            ...action.payload.data, // Update only the fields provided in the payload
          },
          loading: false,
        };
      } else {
        return state; // If the lovedOneId doesn't match, return the current state
      }

    case GET_LOVED_ONE_SUCCESS:
      // On success, update the state with the new/retreived loved one's data and stop loading
      return {
        ...state,
        lovedOne: {
          ...state.lovedOne,
          ...action.payload,
        },
        loading: false,
      };

    case REMOVE_LOVED_ONE_SUCCESS:
      // On success, reset the lovedOne to its initial state and stop loading
      return {
        ...state,
        lovedOne: resetLovedOne(),
        loading: false,
      };

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

    case AUTHORIZATION_FAILURE:
      // On authorization failure, reset the state to initialState and update the error message
      return {
        ...initialState,
        error: "Authorization failed. Please log in again.",
      };

    default:
      // Returns the current state if no action matches
      return state;
  }
};

// Export the reducer
export default lovedOneReducer;
