import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { useState } from "react";

import { io } from "socket.io-client";
import Chat from "./Chat";
import socket from "../../socket";

function Messages() {
  const history = useHistory();

  // Use this to use as auto fill to fill in the user
  const user = useSelector((store) => store.user);
  const firstName = user.first_name;
  const lastName = user.last_name;
  const usernameID = user.username;
  const fullName = firstName + lastName;

  const [username, setUsername] = useState(fullName); // Initialize with fullName

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // import { io } from 'socket.io-client';

  // const socket = io('http://localhost:3000');

  function Messages() {
    // const dispatch = useDispatch();
    // const history = useHistory();

    // const [message, setMessage] = useState([]);
    // const [newMessage, setNewMessage] = useState('');

    // useEffect(() => {
    //     dispatch({
    //         type: 'FETCH_MESSAGES'
    //     });
    // }, [])
    // useEffect(() => {
    //     socket.on('newMessage', (message) => {
    //         dispatch({
    //             type: 'SET_MESSAGES',
    //             payload: message
    //         });
    //     });
    // }, [socket, dispatch]);

    // const handleSubmit = (event) => {
    //     console.log('Handle submit is working')
    //     event.preventDefault();
    //     socket.emit('chat message', newMessage); // use socket.emit to send data
    //     console.log('New Message is', newMessage)
    //     dispatch({
    //         type: 'SEND_MESSAGE',
    //         payload: newMessage,
    //     });
    //     setNewMessage('');
    // };

    // Loved One data ID will be used to auto populate for the roomID
    const lovedOneID = user.loved_one_id;
    const [room, setRoom] = useState(lovedOneID);

    const handleRoomIDChange = (e) => {
      setRoom(e.target.value);
    };

    const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
    // Joining a room
    const joinRoom = () => {
      console.log("Joining room...");
      if (username !== "" && room !== "") {
        socket.emit("join_room", room);
        console.log("Joined Room Succesfully !");
        setHasJoinedRoom(true); // Set hasJoinedRoom to true
      }
      history.push("/Chat");
    };

    // console.log("username is:", username)
    // console.log("Socket is:", socket)
    // console.log("Room ID is:", room)
    return (
      <div>
        <h4>Enter Loved One's Name</h4>
        <input
          id="Username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />

        <input
          id="RoomId"
          type="text"
          value={room}
          onChange={handleRoomIDChange}
        />
        <button onClick={joinRoom}>Join Room</button>
        {hasJoinedRoom && (
          <Chat username={{ username: usernameID }} room={room} />
        )}
      </div>
    );

    // const messages = useSelector((store) => store.messages)
    // console.log('Message Data is:', messages)

    // return (
    //     <div>
    //         <h1>Messages</h1>
    //         {messages.map(messages => {
    //             return (
    //                 <div key = {messages?.id}>
    //                     <h2>{messages?.user_id}</h2>
    //                     <p>
    //                         {messages?.message_text}
    //                     </p>
    //                 </div>
    //             )
    //         })}
    //          <form onSubmit={handleSubmit}>
    //             <input
    //                 type="text"
    //                 value={newMessage}
    //                 onChange={(event) => setNewMessage(event.target.value)}
    //                 placeholder="Type a message..."
    //             />
    //             <button type="submit">Send</button>
    //         </form>
    //     </div>
    // )
  }
}

export default Messages;
