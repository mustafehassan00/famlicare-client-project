export const CREATE_LOVED_ONE = "CREATE_LOVED_ONE";
export const UPDATE_LOVED_ONE = "UPDATE_LOVED_ONE";
export const SUBMIT_LOVED_ONE = "SUBMIT_LOVED_ONE";

export const createLovedOne = (data) => ({
  type: CREATE_LOVED_ONE,
  payload: data,
});

export const updateLovedOne = (data) => ({
  type: UPDATE_LOVED_ONE,
  payload: data,
});

export const submitLovedOne = () => ({
  type: SUBMIT_LOVED_ONE,
});
