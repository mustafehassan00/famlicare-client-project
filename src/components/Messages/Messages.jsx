import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

function Messages() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [message, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState('');


    useEffect(() => {
        dispatch({
            type: 'FETCH_MESSAGES'
        });
    }, [])
    useEffect(() => {
        socket.on('newMessage', (message) => {
            dispatch({
                type: 'SET_MESSAGES',
                payload: message
            });
        });
    }, [socket, dispatch]);

    const handleSubmit = (event) => {
        console.log('Handle submit is working')
        event.preventDefault();
        socket.emit('chat message', newMessage); // use socket.emit to send data 
        console.log('New Message is', newMessage)
        dispatch({
            type: 'SEND_MESSAGE',
            payload: newMessage,
        });
        setNewMessage('');
    };


    const messages = useSelector((store) => store.messages)
    console.log('Message Data is:', messages)

    return (
        <div>
            <h1>Messages</h1>
            {messages.map(messages => {
                return (
                    <div key = {messages?.id}>
                        <h2>{messages?.user_id}</h2>
                        <p>
                            {messages?.message_text}
                        </p>
                    </div>
                )
            })}
             <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(event) => setNewMessage(event.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default Messages;
