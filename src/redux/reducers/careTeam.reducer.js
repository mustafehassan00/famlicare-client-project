
const initialState = {
  lovedOne: null,
  error: null,
  invitationSent: false
};

const careTeamReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOVED_ONE':
      return {
        ...state,
        lovedOne: action.payload,
        error: null
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'INVITATION_SENT':
      return {
        ...state,
        invitationSent: true
      };
    default:
      return state;
  }
};

export default careTeamReducer;