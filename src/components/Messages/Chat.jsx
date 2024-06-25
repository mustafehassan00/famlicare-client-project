import React, { useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from "react-redux";
import useSocketSetup from "./UseSocketSetup";
import socket from "../../socket"
import { useEffect } from "react";



function Chat() {



    // Use this to use as auto fill to fill in the user 
    const user = useSelector((store) => store.user);
    const firstName = user.first_name
    const lastName = user.last_name
    const usernameID = user.username
    const fullName = firstName + lastName;
    const [username, setUsername] = useState(fullName); // Initialize with fullName


    const lovedOneID = user.loved_one_id;
    const [room, setRoom] = useState(lovedOneID);

    const [currentMessage, setCurrentMessage] = useState("")
    console.log("props is:", username, room)
    const [messages, setMessages] = useState([]);

    useSocketSetup();
    useEffect(() => {
        socket.emit('join_room', room);
        socket.on('new_message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
        socket.emit('fetch messages', room);
        socket.on('messages', (messages) => {
            setMessages(messages);
        });
    }, [room, socket]);

    // useEffect(() => {
    //     socket.emit('join_room', room);
    //     socket.on('new_message', (message) => {
    //       setMessages((prevMessages) => [...prevMessages, message]);
    //     });
    //   }, [room]);

    // useEffect(() => {
    //     socket.emit('fetch messages', room);
    //   }, [room]);

    //   socket.on('messages', (messages) => {
    //     setMessages(messages);
    //   });


    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                // room: room,
                // username: username,
                message: currentMessage,
                room: room
                // time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()

            }
            console.log(messageData.message)
            await socket.emit("new message", messageData)

        }
    }


    return (
        <div>
            <div >
                <p>Live Chat</p>
            </div>
            <p>{firstName + '' + lastName}</p>
            <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user_id === user.id ? 'You' : 'Other'}: </strong>
            {msg.message_text}
          </div>
        ))}
      </div>
            <div >
                <input
                    type="text"
                    placeholder="Type a message..."
                    onChange={(e) => { setCurrentMessage(e.target.value) }}
                />
                <button onClick={sendMessage}>&#9658;</button>

            </div>
        </div>
    )
}

export default Chat;

