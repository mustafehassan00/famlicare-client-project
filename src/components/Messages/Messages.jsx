import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { io } from 'socket.io-client';

const socket = io.connect("http://localhost:5173");



function Messages() {
    // Use this to use as auto fill to fill in the user 
const user = useSelector((store) => store.user);
const firstName = user.first_name
const lastName = user.last_name
const usernameID = user.username
const fullName = usernameID

const [username, setUsername] = useState(fullName); // Initialize with fullName
const handleUsernameChange = (e) => {
    setUsername(e.target.value);
};
    return(
        <div>
            <h4>Enter Loved One's Name</h4>
            <input 
            id = "Username"
            type="text" 
            value = {username}
            onChange={handleUsernameChange}
             />
            
            
            <input 
            id = "RoomId"
            type="text" 
             />
            <button>Join Room</button>
        </div>
    )
}

export default Messages;
