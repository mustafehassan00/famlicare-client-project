import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { io } from 'socket.io-client';
import Chat from "./chat";

const socket = io.connect("http://localhost:3001");




function Messages() {
const history = useHistory()

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
const [room, newRoom] = useState(lovedOneID);

const handleRoomIDChange = (e) => {
    newRoom(e.target.value);
}

// Joining a room 
const joinRoom = () =>{
    //if statement is saying that username and roomID cannot be empty
    if(username !== "" && room !== "") {
        socket.emit("join_room", room);
    }
    history.push('/Chat');
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
            value = {room}
            onChange={handleRoomIDChange}
             />
            <button onClick={joinRoom}>Join Room</button>
            <Chat socket = {socket} username= {username} room = {room}/>
        </div>
    );
}

export default Messages;
