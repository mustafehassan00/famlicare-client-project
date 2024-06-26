// Initial state of the care team reducer. Defines the structure of the state managed by this reducer.
const initialState = {
  lovedOne: null, // Represents the current user's loved one.
  error: null, // Holds error messages related to care team actions.
  invitationSent: false, // Flag indicating whether an invitation has been successfully sent.
  verificationSuccessful: false, // Flag indicating whether an invitation code verification was successful.
  members: [], // Array holding the list of care team members.
};

// The careTeamReducer function updates the state based on the received action types.
const careTeamReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOVED_ONE":
      // Updates the lovedOne in the state. Clears any existing errors.
      return {
        ...state,
        lovedOne: action.payload,
        error: null,
      };
    case "SET_ERROR":
      // Sets an error message in the state. This can be used to display error messages to the user.
      return {
        ...state,
        error: action.payload,
      };
    case "CLEAR_ERROR":
      // Clears any existing error messages from the state.
      return {
        ...state,
        error: null,
      };
    case "INVITATION_SENT":
      // Updates the state to indicate that an invitation has been sent.
      return {
        ...state,
        invitationSent: true,
      };
    case "VERIFICATION_SUCCESSFUL":
      // Updates the state to indicate that an invitation code verification was successful.
      return {
        ...state,
        verificationSuccessful: true,
      };
    case "SET_CARE_TEAM_MEMBERS":
      // Updates the list of care team members in the state.
      return { ...state, members: action.payload };

    default:
      // Returns the current state for any action types not explicitly handled.
      return state;
  }
};

export default careTeamReducer;

// Maintenance Tips:
// - When adding new action types, ensure they are unique and descriptive.
// - For each new action type, consider how it affects the existing state and ensure the state is updated appropriately.
// - Regularly review the state structure to ensure it meets the application's needs and refactor as necessary.

// Troubleshooting:
// - If expected state updates are not occurring, check that the action type dispatched matches those handled in the reducer.
// - Ensure that payloads are correctly structured and passed to the reducer.
// - Use debugging tools to inspect the current state and actions dispatched to identify discrepancies.