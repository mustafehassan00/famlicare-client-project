// Action types for creating a loved one
export const CREATE_LOVED_ONE_REQUEST = "CREATE_LOVED_ONE_REQUEST"; // Indicates the start of the create loved one process
export const CREATE_LOVED_ONE_SUCCESS = "CREATE_LOVED_ONE_SUCCESS"; // Indicates the successful creation of a loved one
export const CREATE_LOVED_ONE_FAILURE = "CREATE_LOVED_ONE_FAILURE"; // Indicates a failure in the creation process, check payload for error details

// Action types for updating a loved one
export const UPDATE_LOVED_ONE_REQUEST = "UPDATE_LOVED_ONE_REQUEST"; // Indicates the start of the update loved one process
export const UPDATE_LOVED_ONE_SUCCESS = "UPDATE_LOVED_ONE_SUCCESS"; // Indicates the successful update of a loved one
export const UPDATE_LOVED_ONE_FAILURE = "UPDATE_LOVED_ONE_FAILURE"; // Indicates a failure in the update process, check payload for error details

// Action types for geting a loved one's details
export const GET_LOVED_ONE_REQUEST = "GET_LOVED_ONE_REQUEST"; // Indicates the start of the get loved one process
export const GET_LOVED_ONE_SUCCESS = "GET_LOVED_ONE_SUCCESS"; // Indicates the successful retrieval of a loved one's details
export const GET_LOVED_ONE_FAILURE = "GET_LOVED_ONE_FAILURE"; // Indicates a failure in the get process, check payload for error details

// Action types for removing a loved one
export const REMOVE_LOVED_ONE_REQUEST = "REMOVE_LOVED_ONE_REQUEST"; // Indicates the start of the remove loved one process
export const REMOVE_LOVED_ONE_SUCCESS = "REMOVE_LOVED_ONE_SUCCESS"; // Indicates the successful removal of a loved one
export const REMOVE_LOVED_ONE_FAILURE = "REMOVE_LOVED_ONE_FAILURE"; // Indicates a failure in the removal process, check payload for error details

// Action type for authorization failures
export const AUTHORIZATION_FAILURE = "AUTHORIZATION_FAILURE"; // Indicates a failure in authorization, potentially due to invalid credentials or expired tokens

// Action types for form steps
export const STORE_LOVED_ONE_NAME_INFO_REQUEST = "STORE_LOVED_ONE_NAME_INFO_REQUEST";
export const STORE_LOVED_ONE_NAME_INFO_SUCCESS = "STORE_LOVED_ONE_NAME_INFO_SUCCESS";
export const STORE_LOVED_ONE_NAME_INFO_FAILURE = "STORE_LOVED_ONE_NAME_INFO_FAILURE";

export const STORE_LOVED_ONE_DETAIL_INFO_REQUEST = "STORE_LOVED_ONE_DETAIL_INFO_REQUEST";
export const STORE_LOVED_ONE_DETAIL_INFO_SUCCESS = "STORE_LOVED_ONE_DETAIL_INFO_SUCCESS";
export const STORE_LOVED_ONE_DETAIL_INFO_FAILURE = "STORE_LOVED_ONE_DETAIL_INFO_FAILURE";

export const STORE_LOVED_ONE_ADDRESS_INFO_REQUEST = "STORE_LOVED_ONE_ADDRESS_INFO_REQUEST";
export const STORE_LOVED_ONE_ADDRESS_INFO_SUCCESS = "STORE_LOVED_ONE_ADDRESS_INFO_SUCCESS";
export const STORE_LOVED_ONE_ADDRESS_INFO_FAILURE = "STORE_LOVED_ONE_ADDRESS_INFO_FAILURE";