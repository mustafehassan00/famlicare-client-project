import React, { useState } from 'react';


function chat({ socket, username, room }) {
    console.log('Chat props:', socket, username, room);
    

    const [currentMessage, setCurrentMessage] = useState("")

    const sendMessage = async () => {
        if(currentMessage !== "") {
            const messageData = {
                room: room,
                username: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()

            }
            await socket.emit("send_message", messageData)
        }
    }

    return (
        <div>
            <div classname="chat-header">
                <p>Live Chat</p>
            </div>
            <div classname="chat-body">

            </div>
            <div classname="chat-footer">
                <input 
                type="text"
                placeholder="Type a message..."
                onChange={(e) => {setCurrentMessage(e.target.value)}}
                />
                <button onClick={sendMessage}>&#9658;</button>

            </div>
        </div>
    )
}

export default chat;

