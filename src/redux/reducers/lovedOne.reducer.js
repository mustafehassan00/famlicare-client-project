//Import the actions
import {
  CREATE_LOVED_ONE,
  UPDATE_LOVED_ONE,
  SUBMIT_LOVED_ONE,
} from "./actions/lovedOne.actions";

// Define the initial state with default values for a loved one's information
// This structure helps in maintaining a predictable state shape and easier state management
const initialState = {
  first_name: "",
  last_name: "",
  age: "",
  medical_condition: "", // Any medical conditions the loved one has
  street_address: "",
  street_address2: "",
  city: "",
  state_province: "",
  country: "",
  postal_code: "",
};

// The reducer function for lovedOne state updates
// It listens for actions dispatched to the store and updates the state accordingly
const lovedOne = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_LOVED_ONE:
      return {
        ...state,
        ...action.payload,
      };

    case UPDATE_LOVED_ONE:
      // Handles the UPDATE_LOVED_ONE action
      // Merges the existing state with the new data provided in action.payload
      // Ensures that updates are made immutably
      return {
        ...state,
        ...action.payload,
      };

    case SUBMIT_LOVED_ONE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      // Returns the current state if no action matches
      return state;
  }
};

// Export the reducer as the default export of this module
// This makes it available for import into the root reducer of the Redux store
// The loved one's information will be accessible in the Redux state under state.lovedOne
export default lovedOne;
