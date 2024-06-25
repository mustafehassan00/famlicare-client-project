const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'UNSET_USER':
      return {};
    case 'UPDATE_USER_FIELD':
      return { ...state, [action.payload.field]: action.payload.value };
    default:
      return state;
  }
};

export default userReducer;