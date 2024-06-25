// Action creators for care team related functionalities.

/**
 * Action creator for sending an email to an invited user.
 * @param {string} email - The email address of the invited user.
 * @returns {Object} An action object with type 'SEND_EMAIL_TO_INVITED_USER' and the email payload.
 */
export const sendEmailToInvitedUser = (email) => ({
    type: 'SEND_EMAIL_TO_INVITED_USER',
    payload: { email }
});

/**
 * Action creator for verifying an invitation code.
 * @param {string} invitationCode - The invitation code to be verified.
 * @returns {Object} An action object with type 'VERIFY_INVITATION_CODE' and the invitation code payload.
 */
export const verifyInvitationCode = (invitationCode) => ({
    type: 'VERIFY_INVITATION_CODE',
    payload: { invitationCode }
});

/**
 * Action creator for setting an error message in the state.
 * @param {string} error - The error message to be set.
 * @returns {Object} An action object with type 'SET_ERROR' and the error payload.
 */
export const setError = (error) => ({
    type: 'SET_ERROR',
    payload: error
});

/**
 * Action creator for clearing any error messages from the state.
 * @returns {Object} An action object with type 'CLEAR_ERROR'.
 */
export const clearError = () => ({
    type: 'CLEAR_ERROR'
});

/**
 * Action creator for initiating the fetch of care team members.
 * @returns {Object} An action object with type 'FETCH_CARE_TEAM_MEMBERS'.
 */
export const fetchCareTeamMembers = () => ({ type: 'FETCH_CARE_TEAM_MEMBERS' });

/**
 * Action creator for setting the care team members in the state.
 * @param {Array} members - The list of care team members to be set in the state.
 * @returns {Object} An action object with type 'SET_CARE_TEAM_MEMBERS' and the members payload.
 */
export const setCareTeamMembers = (members) => ({ type: 'SET_CARE_TEAM_MEMBERS', payload: members });