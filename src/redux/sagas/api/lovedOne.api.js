import axios from 'axios';

// Base URL for all loved one related API calls. Adjust this as necessary based on your deployment.
const baseURL = '/api/loved-one';

/**
 * Retrieve a specific loved one by their ID.
 * @param {string} id - The ID of the loved one to retrieve.
 * @returns {Promise<Object>} The loved one data.
 * @throws Will throw an error if the request fails, useful for troubleshooting API call issues.
 */
export const getLovedOneApi = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/${id}`);
    return response.data;
  } catch (error) {
    // Consider logging the error or sending it to a monitoring service here
    throw error;
  }
};

/**
 * Add a new loved one.
 * @param {Object} lovedOneData - The data of the loved one to create.
 * @returns {Promise<Object>} The created loved one data.
 * @throws Will throw an error if the request fails, useful for troubleshooting API call issues.
 */
export const createLovedOneApi = async (lovedOneData) => {
  try {
    const requestUrl = `${baseURL}`;
    console.log(`Request URL: ${requestUrl}`, `Data being sent:`, lovedOneData);
    const response = await axios.post(requestUrl, lovedOneData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Update a loved one's information.
 * @param {string} id - The ID of the loved one to update.
 * @param {Object} updateData - The data to update the loved one with.
 * @returns {Promise<Object>} The updated loved one data.
 * @throws Will throw an error if the request fails, useful for troubleshooting API call issues.
 */
export const updateLovedOneApi = async (id, updateData) => {
  try {
    const response = await axios.put(`${baseURL}/${id}`, updateData);
    return response.data;
  } catch (error) {
    // Consider logging the error or sending it to a monitoring service here
    throw error;
  }
};

/**
 * Remove a loved one by their ID.
 * @param {string} id - The ID of the loved one to remove.
 * @returns {Promise<Object>} Confirmation of the deletion.
 * @throws Will throw an error if the request fails, useful for troubleshooting API call issues.
 */
export const removeLovedOneApi = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/${id}`);
    return response.data;
  } catch (error) {
    // Consider logging the error or sending it to a monitoring service here
    throw error;
  }
};