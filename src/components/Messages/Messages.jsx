import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import socket from "../../socket";

function Messages() {
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const fullName = `${user.first_name} ${user.last_name}`;
  const [username, setUsername] = useState(fullName);
  const [room, setRoom] = useState(user.loved_one_id);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (room) {
      socket.emit("join_room", room);
      console.log(`Joined Room: ${room}`);
    }

  
    socket.on('new_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    
    socket.emit('fetch messages', room);
    socket.on('messages', (fetchedMessages) => {
      setMessages(fetchedMessages);
    });

    
    return () => {
      socket.off('new_message');
      socket.off('messages');
    };
  }, [room]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      socket.emit('new message', { message: newMessage, room });
      setNewMessage('');
    }
  };

  return (
    <div>
      <h1>Messages</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user_id === user.id ? 'You' : 'Other'}: </strong>
            {msg.message_text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Messages;
