const editUserprofile = (state = {}, action) => {
    //👇 holds data dispatched from the reducer for the user we are editing
    switch (action.type) {
      case 'SET-USER-TO-EDIT':
     //👇 holds data that is editied by user
        return action.payload;
      case 'CHANGE-CURRENT USERNAME':
        return { ...state, username: action.payload };
      case 'CHANGE-CURRENT EMAIL':
        return { ...state, email: action.payload }; // Corrected to update email
      case 'CHANGE-CURRENT PHONE-NUMBER':
        return { ...state, phone_number: action.payload }; // Corrected to update phone_number
      case 'CHANGE-CURRENT FIRST-NAME':
        return {...state, first_name: action.payload};
      case 'CHANGE-CURRENT LAST-NAME':
        return {...state, last_name: action.payload};
      default:
        return state;
    }
  };
  
  export default editUserprofile;
  