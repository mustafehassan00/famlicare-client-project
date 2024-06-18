import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchMessages() {
    try{
        const messageResponse = yield axios.get('/api/messages');
        console.log('Message Response Data:', messageResponse.data);

        yield put ({
            type: 'SET_MESSAGES',
            payload: messageResponse.data
        })
    }
    catch (error) {
        console.log('Error in fetchMessages', error);
    }
    
}

function* messagesSaga() {
  yield takeLatest('FETCH_MESSAGES', fetchMessages);
}

export default messagesSaga;