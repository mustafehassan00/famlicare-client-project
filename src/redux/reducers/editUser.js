const editUserprofile = (state = {},action) => {
    // holds the data dispatch from saga
    if (action.type === 'SET-USER-TO-EDIT') {  
          return action.payload
          // holds the value of the change
    } else if (action.type === "CHANGE-CURRENT USERNAME"){
        return {...state, username: action.payload}
    } else if (action.type === "CHANGE-CURRENT EMAIL"){
        return {...state, username: action.payload}
    } else if (action.type === "CHANGE-CURRENT PHONE-NUMBER"){
        return {...state, username: action.payload}
    }
    return state;
}


export default editUserprofile;