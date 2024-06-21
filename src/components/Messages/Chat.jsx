import React from "react"

function Chat(socket, username, room) {
    return (
        <div>
            <div classname="chat-header">
                <p>Live Chat</p>
            </div>
            <div classname="chat-body">

            </div>
            <div classname="chat-footer">
                <input type="text" 
                placeholder="Type a message..." 
                />
                <button>&#9658;</button>

            </div>
        </div>
    )
}

export default Chat;