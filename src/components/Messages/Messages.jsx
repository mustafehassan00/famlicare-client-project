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
const fullName = firstName + lastName;

const [username, setUsername] = useState(fullName); // Initialize with fullName

const handleUsernameChange = (e) => {
    setUsername(e.target.value);
};

// Loved One data ID will be used to auto populate for the roomID 
const lovedOneID = user.loved_one_id;
const [lovedOne, newLovedOne] = useState(lovedOneID);

const handleRoomIDChange = (e) => {
    newLovedOne(e.target.value);
}



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
            value = {lovedOne}
            onChange={handleRoomIDChange}
             />
            <button>Join Room</button>
        </div>
    )
}

export default Messages;
