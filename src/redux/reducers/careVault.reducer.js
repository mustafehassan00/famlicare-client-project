const initialState = {
  files: [],
  error: null,
  isLoading: false,
  currentFileUrl: null,
};

const careVault = (state = initialState, action) => {
  switch (action.type) {
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        files: [...state.files, action.payload],
        error: null,
        isLoading: false,
      };
    case "UPLOAD_FAILURE":
    case "DELETE_FAILURE":
    case "FETCH_FILES_FAILURE":
    case "SET_FILE_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case "DELETE_SUCCESS":
      return {
        ...state,
        files: state.files.filter((file) => file.id !== action.payload),
        error: null,
        isLoading: false,
      };
    case "SET_FILES":
      return {
        ...state,
        files: action.payload,
        isLoading: false,
      };
    case "SET_FILE_URL":
      return {
        ...state,
        currentFileUrl: action.payload.url,
        isLoading: false,
      };
    case "FETCH_FILES":
    case "UPLOAD_FILES":
    case "DELETE_FILES":
    case "GET_FILE_URL":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    default:
      return state;
  }
};

export default careVault;