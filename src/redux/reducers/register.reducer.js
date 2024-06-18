const initialState = {
  username: "",
  emailAddress: "",
  password: "",
  phoneNumber: "",
  image: "",
  firstName: "",
  lastName: "",
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USERNAME_EMAIL_PASSWORD":
      return {
        ...state,
        username: action.payload.username,
        emailAddress: action.payload.emailAddress,
        password: action.payload.password,
      };
    case "PHONE_NUMBER":
      return {
        ...state,
        phoneNumber: action.payload.phoneNumber,
      };
    case "IMAGE":
      return {
        ...state,
        image: action.payload.image,
      };
    case "FIRST_LAST_NAME":
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
      };
    default:
      return state;
  }
};

export default registerReducer;
