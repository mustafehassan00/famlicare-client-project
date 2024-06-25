export const sendEmailToInvitedUser = (email) => ({
    type: 'SEND_EMAIL_TO_INVITED_USER',
    payload: { email }
  });
  
  export const verifyInvitationCode = (invitationCode) => ({
    type: 'VERIFY_INVITATION_CODE',
    payload: { invitationCode }
  });
  
  export const setError = (error) => ({
    type: 'SET_ERROR',
    payload: error
  });
  
  export const clearError = () => ({
    type: 'CLEAR_ERROR'
  });