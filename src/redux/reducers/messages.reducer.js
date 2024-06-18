
const messages = (state = [], action) => {
    switch (action.type) {
      case 'SET_MESSAGES':
        return action.payload;

const messages = (state = {}, action) => {
    switch (action.type) {
    //   case 'SET_USER':
    //     return action.payload;
    //   case 'UNSET_USER':
    //     return {};

      default:
        return state;
    }
  };

  export default messages;