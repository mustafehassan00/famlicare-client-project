import axios from 'axios';
import { put, take, takeLatest } from 'redux-saga/effects';

// function* fetchMessages() {
//     try{
//         const messageResponse = yield axios.get('/api/messages');
//         console.log('Message Response Data:', messageResponse.data);

//         yield put ({
//             type: 'SET_MESSAGES',
//             payload: messageResponse.data
//         })
//     }
//     catch (error) {
//         console.log('Error in fetchMessages', error);
//     }
    
// }

// function* fetchSentMessages(action){
//     try{
//         yield axios.post('/api/messages', action.payload);

//         // Emit a 'new message' event to the client
//         socket.emit('new message', action.payload);

//         yield put ({
//             type:'SEND_MESSAGE'
//         })
//     } catch (error) {
//         console.log('Error In fetchSentMessages', error)
//     }
// }

function* messagesSaga() {
//   yield takeLatest('FETCH_MESSAGES', fetchMessages);
//   yield takeLatest ('FETCH_SENT_MESSAGES', fetchSentMessages);
}

export default messagesSaga;