const editUserprofile = (state = {},action) => {
    if (action.tyype === 'SET-USER-TO-EDIT') {  
          return action.payload
    }
    return state;
}


export default editUserprofile;