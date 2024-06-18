const initialState = {
  files: [],
  error: null,
};

const careVault = (state = initialState, action) => {
  switch (action.type) {
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        files: [...state.files, action.payload],
        error: null,
      };
    case "UPLOAD_FAILURE":
      return {
        ...state,
        error: action.error,
      };
    case "DELETE_SUCCESS":
      return {
        ...state,
        files: state.files.filter((file) => file.id !== action.payload),
        error: null,
      };
    case "DELETE_FAILURE":
      return {
        ...state,
        error: action.error,
      };
    case "SET_FILES":
      return {
        ...state,
        files: action.payload,
      };
    default:
      return state;
  }
};

export default careVault;
