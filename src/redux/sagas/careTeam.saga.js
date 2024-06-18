import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* careTeam(action) {
    try {
        const response = yield axios.post('/api/care-team', action.payload)
        console.log('invited users email post route sent') 
    } catch(error){
        console.log('error sending email in careTeam saga', error)
    }
}

function* careTeamSaga() {
    yield takeLatest('SEND_EMAIL_TO_INVITED_USER', careTeam);
}

export default careTeamSaga;