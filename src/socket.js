import { io } from 'socket.io-client';


// "undefined" means the URL will be computed from the `window.location` object
//link should be the location of the server! (5001 in development)
//Production NODE_ENV may have to point to env for hosting ??

const URL = process.env.NODE_ENV === 'production' ? 'https://famlicare-0348fad2c799.herokuapp.com/' : 'http://localhost:5001';


const socket = new io(URL, {
    autoConnect: false,
    withCredentials: true
});
export default socket 